import extensions from './extensions';
import RantaAdapter from './lib';

const ranta = new RantaAdapter({
  debug: true,
  extensions
});

export default ranta.getCtx();

export * from './lib/helper';
