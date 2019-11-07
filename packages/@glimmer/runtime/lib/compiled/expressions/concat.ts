import { Option, Dict, Maybe } from '@glimmer/interfaces';
import { CachedReference, PathReference } from '@glimmer/reference';
import { Tag } from '@glimmer/validator';
import { combineTagged } from '../../utils/tags';

export class ConcatReference extends CachedReference<Option<string>> {
  public tag: Tag;

  constructor(private parts: Array<PathReference<unknown>>) {
    super();
    this.tag = combineTagged(parts);
  }

  protected compute(): Option<string> {
    let parts = new Array<string>();

    for (let i = 0; i < this.parts.length; i++) {
      let value = this.parts[i].value() as Maybe<Dict>;

      if (value !== null && value !== undefined) {
        parts[i] = castToString(value);
      }
    }

    if (parts.length > 0) {
      return parts.join('');
    }

    return null;
  }
}

function castToString(value: Dict) {
  if (typeof value.toString !== 'function') {
    return '';
  }

  return String(value);
}
