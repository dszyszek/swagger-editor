import { Spectral } from '@stoplight/spectral';
import { oas2Functions, oas2Rules } from '@stoplight/spectral/rulesets/oas2';

export function diagnose(spec: object) {
  const spectral = new Spectral();
  spectral.addFunctions(oas2Functions());
  spectral.addRules(oas2Rules());
  return spectral.run(spec).results;
}
