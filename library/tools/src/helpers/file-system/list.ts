import type { PathLike } from 'fs';
import fs from 'fs';

// File system

// Promise example
// Callback example
// Synchronous example
// Promises API
// Class: FileHandle
// Event: 'close'
// filehandle.appendFile(data[, options])
// filehandle.chmod(mode)
// filehandle.chown(uid, gid)
// filehandle.close()
// filehandle.createReadStream([options])
// filehandle.createWriteStream([options])
// filehandle.datasync()
// filehandle.fd
// filehandle.read(buffer, offset, length, position)
// filehandle.read([options])
// filehandle.read(buffer[, options])
// filehandle.readableWebStream([options])
// filehandle.readFile(options)
// filehandle.readLines([options])
// filehandle.readv(buffers[, position])
// filehandle.stat([options])
// filehandle.sync()
// filehandle.truncate(len)
// filehandle.utimes(atime, mtime)
// filehandle.write(buffer, offset[, length[, position]])
// filehandle.write(buffer[, options])
// filehandle.write(string[, position[, encoding]])
// filehandle.writeFile(data, options)
// filehandle.writev(buffers[, position])
// filehandle[Symbol.asyncDispose]()

// Create a wraper function for fs to make it more easy to use.
// fsPromises.access(path[, mode])
// Create a wraper function for fsPromises.access to make it more easy to use.

export async function access(
  path: PathLike,
  mode?: number | undefined
): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.access(path, mode, err => {
      err ? reject(err) : resolve();
    });
  });
}

// fsPromises.appendFile(path, data[, options])
// Create a wraper function for fsPromises.appendFile to make it more easy to use.
export async function appendFile(
  path: fs.PathOrFileDescriptor,
  data: Uint8Array | string,
  options: fs.WriteFileOptions
  // callback: fs.NoParamCallback
) {
  return new Promise((resolve, reject) => {
    fs.appendFile(path, data, options, err => {
      err ? reject(err) : resolve(undefined);
    });
  });
}
// fsPromises.chmod(path, mode)
// fsPromises.chown(path, uid, gid)
// fsPromises.copyFile(src, dest[, mode])
// fsPromises.cp(src, dest[, options])
// fsPromises.lchmod(path, mode)
// fsPromises.lchown(path, uid, gid)
// fsPromises.lutimes(path, atime, mtime)
// fsPromises.link(existingPath, newPath)
// fsPromises.lstat(path[, options])
// fsPromises.mkdir(path[, options])
// fsPromises.mkdtemp(prefix[, options])
// fsPromises.open(path, flags[, mode])
// fsPromises.opendir(path[, options])
// Create a wraper function for fsPromises.opendir to make it more easy to use.
export async function opendir(
  path: string,
  options: fs.OpenDirOptions
): Promise<fs.Dir> {
  return new Promise((resolve, reject) => {
    fs.opendir(path, options, (err, dir) => {
      err ? reject(err) : resolve(dir);
    });
  });
}
// then you can use:
// dir.close() or dir.closeSync()
// create a wraper function for dir.close to make it more easy to use.
export async function close(dir: fs.Dir) {
  return new Promise((resolve, reject) => {
    dir.close(err => {
      err ? reject(err) : resolve(undefined);
    });
  });
}
// dir.path
// create a wraper function for dir.path to make it more easy to use.
export function path(dir: fs.Dir) {
  return dir.path;
}
// dir.read() or dir.readSync()
// create a wraper function for dir.read to make it more easy to use.
export async function read(dir: fs.Dir) {
  return new Promise((resolve, reject) => {
    dir.read((err, dirent) => {
      err ? reject(err) : resolve(dirent);
    });
  });
}
// create a wraper function to acces dirent to make it more easy to use.
// dirent.isBlockDevice()
export function isBlockDevice(dirent: fs.Dirent): boolean {
  return dirent.isBlockDevice();
}
// dirent.isCharacterDevice()
export function isCharacterDevice(dirent: fs.Dirent): boolean {
  return dirent.isCharacterDevice();
}
// dirent.isDirectory()
export function isDirectory(dirent: fs.Dirent): boolean {
  return dirent.isDirectory();
}
// dirent.isFIFO()
export function isFIFO(dirent: fs.Dirent): boolean {
  return dirent.isFIFO();
}
// dirent.isFile()
export function isFile(dirent: fs.Dirent): boolean {
  return dirent.isFile();
}
// dirent.isSocket()
export function isSocket(dirent: fs.Dirent): boolean {
  return dirent.isSocket();
}
// dirent.isSymbolicLink()
export function isSymbolicLink(dirent: fs.Dirent): boolean {
  return dirent.isSymbolicLink();
}

// dirent.name
export function name(dirent: fs.Dirent): string {
  return dirent.name;
}
// dirent.parentPath Added in: v21.4.0 (but we are using v18.x) so we have to tell typescript that it exist:

interface Dirent extends fs.Dirent {
  /**
   * The path to the parent directory of the file this @see {@link fs.Dirent} object refers to.
   */
  parentPath: string;
}
export function parentPath(dirent: Dirent): string {
  return dirent.parentPath;
}

// Stability: 1 - Experimental: This feature is still under active development and subject to non-backwards compatible changes, or even removal, in any future version. Use of the feature is not recommended in production environments. Experimental features are not subject to the Node.js Semantic Versioning model.
// dirent.path
// Added in: v20.1.0, v18.17.0Deprecated since: v21.5.0
// Stability: 0 - Deprecated: Use dirent.parentPath instead.
/**
 * The path to the file this @see {@link fs.Dirent} object refers to.
 * @deprecated since: v21.5.0
 */
export function direntPath(dirent: Dirent): string {
  return dirent.path;
}

// dir[Symbol.asyncIterator]()

export async function* asyncIteratorDirent(dir: fs.Dir) {
  for await (const dirent of dir) {
    // process dirent
    yield dirent;
  }
}

// fsPromises.readdir(path[, options])
// fsPromises.readFile(path[, options])
// fsPromises.readlink(path[, options])
// fsPromises.realpath(path[, options])
// fsPromises.rename(oldPath, newPath)
// fsPromises.rmdir(path[, options])
// fsPromises.rm(path[, options])
// fsPromises.stat(path[, options])
// fsPromises.statfs(path[, options])
// fsPromises.symlink(target, path[, type])
// fsPromises.truncate(path[, len])
// fsPromises.unlink(path)
// fsPromises.utimes(path, atime, mtime)
// fsPromises.watch(filename[, options])
// fsPromises.writeFile(file, data[, options])
// fsPromises.constants
// Callback API
// fs.access(path[, mode], callback)
// fs.appendFile(path, data[, options], callback)
// fs.chmod(path, mode, callback)
// File modes
// fs.chown(path, uid, gid, callback)
// fs.close(fd[, callback])
// fs.copyFile(src, dest[, mode], callback)
// fs.cp(src, dest[, options], callback)
// fs.createReadStream(path[, options])
// fs.createWriteStream(path[, options])
// fs.exists(path, callback)
// fs.fchmod(fd, mode, callback)
// fs.fchown(fd, uid, gid, callback)
// fs.fdatasync(fd, callback)
// fs.fstat(fd[, options], callback)
// fs.fsync(fd, callback)
// fs.ftruncate(fd[, len], callback)
// fs.futimes(fd, atime, mtime, callback)
// fs.lchmod(path, mode, callback)
// fs.lchown(path, uid, gid, callback)
// fs.lutimes(path, atime, mtime, callback)
// fs.link(existingPath, newPath, callback)
// fs.lstat(path[, options], callback)
// fs.mkdir(path[, options], callback)
// fs.mkdtemp(prefix[, options], callback)
// fs.open(path[, flags[, mode]], callback)
// fs.openAsBlob(path[, options])
// fs.opendir(path[, options], callback)
// fs.read(fd, buffer, offset, length, position, callback)
// fs.read(fd[, options], callback)
// fs.read(fd, buffer[, options], callback)
// fs.readdir(path[, options], callback)
// fs.readFile(path[, options], callback)
// File descriptors
// Performance Considerations
// fs.readlink(path[, options], callback)
// fs.readv(fd, buffers[, position], callback)
// fs.realpath(path[, options], callback)
// fs.realpath.native(path[, options], callback)
// fs.rename(oldPath, newPath, callback)
// fs.rmdir(path[, options], callback)
// fs.rm(path[, options], callback)
// fs.stat(path[, options], callback)
// fs.statfs(path[, options], callback)
// fs.symlink(target, path[, type], callback)
// fs.truncate(path[, len], callback)
// fs.unlink(path, callback)
// fs.unwatchFile(filename[, listener])
// fs.utimes(path, atime, mtime, callback)
// fs.watch(filename[, options][, listener])
// Caveats
// Availability
// Inodes
// Filename argument
// fs.watchFile(filename[, options], listener)
// fs.write(fd, buffer, offset[, length[, position]], callback)
// fs.write(fd, buffer[, options], callback)
// fs.write(fd, string[, position[, encoding]], callback)
// fs.writeFile(file, data[, options], callback)
// Using fs.writeFile() with file descriptors
// fs.writev(fd, buffers[, position], callback)
// Synchronous API
// fs.accessSync(path[, mode])
// fs.appendFileSync(path, data[, options])
// fs.chmodSync(path, mode)
// fs.chownSync(path, uid, gid)
// fs.closeSync(fd)
// fs.copyFileSync(src, dest[, mode])
// fs.cpSync(src, dest[, options])
// fs.existsSync(path)
// fs.fchmodSync(fd, mode)
// fs.fchownSync(fd, uid, gid)
// fs.fdatasyncSync(fd)
// fs.fstatSync(fd[, options])
// fs.fsyncSync(fd)
// fs.ftruncateSync(fd[, len])
// fs.futimesSync(fd, atime, mtime)
// fs.lchmodSync(path, mode)
// fs.lchownSync(path, uid, gid)
// fs.lutimesSync(path, atime, mtime)
// fs.linkSync(existingPath, newPath)
// fs.lstatSync(path[, options])
// fs.mkdirSync(path[, options])
// fs.mkdtempSync(prefix[, options])
// fs.opendirSync(path[, options])
// fs.openSync(path[, flags[, mode]])
// fs.readdirSync(path[, options])
// fs.readFileSync(path[, options])
// fs.readlinkSync(path[, options])
// fs.readSync(fd, buffer, offset, length[, position])
// fs.readSync(fd, buffer[, options])
// fs.readvSync(fd, buffers[, position])
// fs.realpathSync(path[, options])
// fs.realpathSync.native(path[, options])
// fs.renameSync(oldPath, newPath)
// fs.rmdirSync(path[, options])
// fs.rmSync(path[, options])
// fs.statSync(path[, options])
// fs.statfsSync(path[, options])
// fs.symlinkSync(target, path[, type])
// fs.truncateSync(path[, len])
// fs.unlinkSync(path)
// fs.utimesSync(path, atime, mtime)
// fs.writeFileSync(file, data[, options])
// fs.writeSync(fd, buffer, offset[, length[, position]])
// fs.writeSync(fd, buffer[, options])
// fs.writeSync(fd, string[, position[, encoding]])
// fs.writevSync(fd, buffers[, position])
// Common Objects
// Class: fs.Dir
// dir.close()
// dir.close(callback)
// dir.closeSync()
// dir.path
// dir.read()
// dir.read(callback)
// dir.readSync()
// dir[Symbol.asyncIterator]()
// Class: fs.Dirent
// dirent.isBlockDevice()
// dirent.isCharacterDevice()
// dirent.isDirectory()
// dirent.isFIFO()
// dirent.isFile()
// dirent.isSocket()
// dirent.isSymbolicLink()
// dirent.name
// dirent.parentPath
// dirent.path
// Class: fs.FSWatcher
// Event: 'change'
// Event: 'close'
// Event: 'error'
// watcher.close()
// watcher.ref()
// watcher.unref()
// Class: fs.StatWatcher
// watcher.ref()
// watcher.unref()
// Class: fs.ReadStream
// Event: 'close'
// Event: 'open'
// Event: 'ready'
// readStream.bytesRead
// readStream.path
// readStream.pending
// Class: fs.Stats
// stats.isBlockDevice()
// stats.isCharacterDevice()
// stats.isDirectory()
// stats.isFIFO()
// stats.isFile()
// stats.isSocket()
// stats.isSymbolicLink()
// stats.dev
// stats.ino
// stats.mode
// stats.nlink
// stats.uid
// stats.gid
// stats.rdev
// stats.size
// stats.blksize
// stats.blocks
// stats.atimeMs
// stats.mtimeMs
// stats.ctimeMs
// stats.birthtimeMs
// stats.atimeNs
// stats.mtimeNs
// stats.ctimeNs
// stats.birthtimeNs
// stats.atime
// stats.mtime
// stats.ctime
// stats.birthtime
// Stat time values
// Class: fs.StatFs
// statfs.bavail
// statfs.bfree
// statfs.blocks
// statfs.bsize
// statfs.ffree
// statfs.files
// statfs.type
// Class: fs.WriteStream
// Event: 'close'
// Event: 'open'
// Event: 'ready'
// writeStream.bytesWritten
// writeStream.close([callback])
// writeStream.path
// writeStream.pending
// fs.constants
// FS constants
// File access constants
// File copy constants
// File open constants
// File type constants
// File mode constants
// Notes
// Ordering of callback and promise-based operations
// File paths
// String paths
// File URL paths
// Platform-specific considerations
// Buffer paths
// Per-drive working directories on Windows
// File descriptors
// Threadpool usage
// File system flags
