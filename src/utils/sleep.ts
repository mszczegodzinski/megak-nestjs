export function sleep() {
  return new Promise(resolve =>
    setTimeout(() => resolve('Hello, World!'), 2500),
  );
}
