/**
 * Add a filename to the list with its dependencies first
 * @param {string[]} allFiles all filenames, for consistency checks
 * @param {string} newFile the new file
 * @param {object<string[]>} dependencies each property contains the dependencies for the file named like the key
 * @param {string[]} currentFiles the file that have already been added. This array is modified
 * @param {string[]} cycleCheck an internal stack of visited files
 */
function addWithDependencies (allFiles, newFile, dependencies, currentFiles, cycleCheck) {
  if (cycleCheck.indexOf(newFile) >= 0) {
    throw new Error('Dependency cycle found ' + JSON.stringify(cycleCheck))
  }
  cycleCheck.push(newFile)
  try {
    // Add dependencies first
    if (dependencies[newFile]) {
      dependencies[newFile].forEach(function (dependency) {
        if (allFiles.indexOf(dependency) < 0) {
          throw new Error('Dependency "' + dependency + '" of file "' + newFile + '" is not part of ' + JSON.stringify(allFiles))
        }
        addWithDependencies(allFiles, dependency, dependencies, currentFiles, cycleCheck)
      })
    }
    if (currentFiles.indexOf(newFile) < 0) {
      currentFiles.push(newFile)
    }
  } finally {
    cycleCheck.pop()
  }
  return currentFiles
}

/**
 * Order files by their dependencies (insert dependencies first)
 * @param {string[]} allFiles all filenames, for consistency checks
 * @param {object<string[]>} dependencies each property contains the dependencies for the file named like the key
 * @return {string[]}
 */
function orderFiles (allFiles, dependencies) {
  var result = []
  allFiles.forEach(function (newFile) {
    addWithDependencies(allFiles, newFile, dependencies, result, [])
  })
  return result
}

module.exports = orderFiles
