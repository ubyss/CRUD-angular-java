import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const back = join(root, 'back');
const front = join(root, 'front');
const isWindows = process.platform === 'win32';
const mvnw = join(back, isWindows ? 'mvnw.cmd' : 'mvnw');
const npm = isWindows ? 'npm.cmd' : 'npm';
const children = new Set();
let compiling = false;
let pending = false;
let timer;
let stopping = false;

function run(command, args, cwd, label, onExit) {
  const child = spawn(command, args, {
    cwd,
    stdio: 'inherit',
    shell: isWindows,
    windowsHide: true,
  });
  children.add(child);
  child.on('error', (error) => {
    console.error(`[${label}] ${error.message}`);
    children.delete(child);
    onExit?.(1);
  });
  child.on('exit', (code) => {
    children.delete(child);
    onExit?.(code);
  });
  return child;
}

function compile() {
  if (stopping) return;
  if (compiling) {
    pending = true;
    return;
  }
  compiling = true;
  console.log('\n[back] Alteração detectada; recompilando...');
  run(mvnw, ['compile', '-DskipTests'], back, 'back', (code) => {
    compiling = false;
    if (code !== 0) console.error('[back] Falha na compilação. Aguardando a próxima alteração.');
    if (pending) {
      pending = false;
      compile();
    }
  });
}

function stop() {
  if (stopping) return;
  stopping = true;
  clearTimeout(timer);
  watcher.close();
  for (const child of children) {
    if (isWindows) {
      spawn('taskkill', ['/pid', String(child.pid), '/t', '/f'], { stdio: 'ignore', windowsHide: true });
    } else {
      child.kill('SIGTERM');
    }
  }
}

const watcher = watch(join(back, 'src', 'main'), { recursive: true }, (_event, filename) => {
  if (!filename || !/\.(java|properties|ya?ml|xml|sql)$/i.test(filename)) return;
  clearTimeout(timer);
  timer = setTimeout(compile, 500);
});

process.on('SIGINT', stop);
process.on('SIGTERM', stop);

run(mvnw, ['spring-boot:run', '-DskipTests'], back, 'back', () => {
  if (!stopping) stop();
});
run(npm, ['run', 'start'], front, 'front', () => {
  if (!stopping) stop();
});

console.log('Front: http://localhost:4200 | Back: http://localhost:8080');
console.log('Pressione Ctrl+C para parar os dois.');
