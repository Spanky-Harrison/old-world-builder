export const getRandomId = () =>
  Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, "");

export const updateIds = (type = []) => {
  return type.map((unit) => {
    return {
      ...unit,
      command: unit.command
        ? unit.command.map((commandData, index) => ({
            ...commandData,
            id: index,
          }))
        : null,
      equipment: unit.equipment
        ? unit.equipment.map((equipmentData, index) => ({
            ...equipmentData,
            id: index,
          }))
        : null,
      armor: unit.armor
        ? unit.armor.map((armorData, index) => ({
            ...armorData,
            id: index,
          }))
        : null,
      mounts: unit.mounts
        ? unit.mounts.map((mountsData, index) => ({
            ...mountsData,
            id: index,
          }))
        : null,
      options: unit.options
        ? unit.options.map((optionsData, index) => ({
            ...optionsData,
            id: index,
          }))
        : null,
    };
  });
};
