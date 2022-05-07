import axios, { AxiosResponse } from "axios"
import * as semver from 'semver';
import * as async from 'async';
import npa from 'npm-package-arg';

import { BadRequestError, NotFoundError } from "./errors"
import { NpmPackage, NpmSuggestion } from "./npmPackages/interfaces"
import { ID } from "interfaces";

const NPM_BASE_URL = "https://www.npmjs.com"
const NPM_REGISTRY_URL = "https://registry.npmjs.org"

const axiosInstanceNpm = axios.create({
  baseURL: NPM_BASE_URL,
})

const axiosInstanceRegistry = axios.create({
  baseURL: NPM_REGISTRY_URL,
})

export async function getSuggestionsByTerm(searchTerm: string): Promise<NpmSuggestion[]> {
  try {
    const response: AxiosResponse<NpmSuggestion[]>
      = await axiosInstanceNpm({
        method: "GET",
        url: `/search/suggestions?q=${searchTerm}`
      })

    if (response.status !== 200) {
      throw new BadRequestError(JSON.stringify(response.data))
    }

    return response.data
  } catch (error) {
    throw new BadRequestError(`NpmJs connection error: ${JSON.stringify(error)}`)
  }
}

export async function fetchNpmPackage<T>(packageName: string, packageVersion?: string): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axiosInstanceRegistry({
      method: "GET",
      url: `/${packageName}/${packageVersion || ""}`
    })

    if (response.status !== 200) {
      throw new BadRequestError(JSON.stringify(response.data))
    }

    return response.data
  } catch (error) {
    throw new BadRequestError(`NpmJs connection error: ${JSON.stringify(error)}`)
  }
}



export async function calculateDepsTree(packageId: ID, version: string): Promise<void> {
  console.log('START ======')
  const dependencyTree = {};
  const flatTree: Record<any, any> = {};

  const queue = async.queue<PackageTask>((task, done) => {
    loadPackage(task, done);
  }, 8);
  queue.pause();

  interface PackageTask {
    name: string
    version: string
    parent: Record<string, any>
  }
  
  // get package dependencies and add them to the que
  const parseDependencies = (task: PackageTask, npmPackage: NpmPackage, done: async.ErrorCallback<Error>) => {
    const v = semver.maxSatisfying(Object.keys(npmPackage.versions), task.version);
  
    const version = guessVersion(task.version, npmPackage);
    const fullName = npmPackage.name + '@' + version;
  
    const parent = task.parent[fullName] = {};
  
    if (v) {
      if (flatTree[fullName]) {
        return done();
      }
      flatTree[fullName] = true;
  
      const dependencies = npmPackage.versions[v].dependencies;
      for (const [name, range] of Object.entries(dependencies ?? {})) {
        queue.push({
          name,
          version: range,
          parent,
        });
      }
    }
  
  
    done();
  }
  
  const guessVersion = (versionString: string, packageJson: NpmPackage) => {
    if (versionString === 'latest') {
      versionString = '*';
    }
  
    const availableVersions = Object.keys(packageJson.versions);
    let version = semver.maxSatisfying(availableVersions, versionString, true);
  
    // check for prerelease-only versions
    if (!version && versionString === '*' && availableVersions.every((av) => {
      return new semver.SemVer(av, true).prerelease.length;
    })) {
      // just use latest then
      version = packageJson['dist-tags'] && packageJson['dist-tags'].latest;
    }
  
    if (!version) {
      throw Error('could not find a satisfactory version for string ' + versionString);
    } else {
      return version;
    }
  }

  const loadPackage = async (task: PackageTask, done: async.ErrorCallback<Error>) => {
    // get package
    const name = task.name;
    const registry =  'https://registry.npmjs.org/';
    const couchPackageName = name && npa(name).escapedName;
  
    const response: AxiosResponse = await axiosInstanceRegistry({
      method: "GET",
      url: `/${couchPackageName}`
    })
  
    if (response.status !== 200) {
      // throw new BadRequestError(JSON.stringify(response.data))
      console.log(
        'could not load ' + name + '@' + task.version + ' ' + JSON.stringify(response.data)
      );
      return done();
    }
  
    try {
      parseDependencies(task, response.data, done);
    } catch (error) {
      done();
    }
  }

  try {
    queue.drain(() => {
      console.log({dependencyTree})
      return dependencyTree
    });

    console.log('push:', {
      name: packageId,
      version: version,
      parent: dependencyTree,
    })
    queue.push({
      name: packageId,
      version: version,
      parent: dependencyTree,
    });

    queue.resume();
  } catch (error) {
    throw new NotFoundError(JSON.stringify(error))
  }
}