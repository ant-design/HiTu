import * as allImages from '../../output';

const names = Object.keys(allImages);
export function randomName(types: string[], prevName?: string): string {
  const filteredNames = names.filter(name => {
    let match = false;

    for (let i = 0; i < types.length; i += 1) {
      const type = types[i];

      if (type[0] === '!') {
        if (name.includes(type.slice(1))) {
          return false;
        }
      } else if (name.includes(type)) {
        match = true;
      }
    }

    return match;
  });
  const index = Math.floor(Math.random() * filteredNames.length);
  const name = filteredNames[index];

  if (prevName === name) {
    return randomName(types, prevName);
  }

  return name;
}

export function getComponent(name: string) {
  return (allImages as any)[name];
}
