import { nameMap } from "../pages/magic";

export const getAllOptions = (
  {
    mounts,
    equipment,
    armor,
    options,
    command,
    items,
    detachments,
    activeLore,
    lores,
  },
  { asString, noMagic } = {}
) => {
  const language = localStorage.getItem("lang");
  const allCommand = [];

  if (command) {
    command.forEach(({ active, magic, name_en, ...entry }) => {
      if (active) {
        allCommand.push(entry[`name_${language}`] || name_en);
      }
      if (active && magic && magic?.selected?.length) {
        magic.selected.forEach((selectedItem) => {
          allCommand.push(
            selectedItem.amount > 1
              ? `${selectedItem.amount}x ` + selectedItem[`name_${language}`] ||
                  selectedItem.name_en
              : selectedItem[`name_${language}`] || selectedItem.name_en
          );
        });
      }
    });
  }
  const allEquipment = equipment
    ? equipment
        .filter(({ active }) => active)
        .map(({ name_en, ...item }) => item[`name_${language}`] || name_en)
    : [];
  const allArmor = armor
    ? armor
        .filter(({ active }) => active)
        .map(({ name_en, ...item }) => item[`name_${language}`] || name_en)
    : [];
  const allOptions = options
    ? options
        .filter(({ active }) => active)
        .map(({ name_en, ...item }) => item[`name_${language}`] || name_en)
    : [];
  const allStackableOptions = options
    ? options
        .filter(({ stackableCount }) => stackableCount > 0)
        .map(
          ({ name_en, stackableCount, ...item }) =>
            `${stackableCount} ${item[`name_${language}`] || name_en}`
        )
    : [];
  const allMounts = mounts
    ? mounts
        .filter(({ active }) => active)
        .map(({ name_en, ...item }) => item[`name_${language}`] || name_en)
    : [];
  const allItems = [];
  if (items?.length) {
    items.forEach((item) => {
      (item.selected || []).forEach((selectedItem) => {
        allItems.push(
          selectedItem.amount > 1
            ? `${selectedItem.amount}x ` +
                (selectedItem[`name_${language}`] || selectedItem.name_en)
            : selectedItem[`name_${language}`] || selectedItem.name_en
        );
      });
    });
  }
  const allDetachments = detachments
    ? detachments
        .filter(({ strength }) => strength > 0)
        .map(({ name_en, strength, equipment, armor, options, ...item }) => {
          let equipmentSelection = [];

          if (equipment && equipment.length) {
            equipment.forEach((option) => {
              option.active &&
                equipmentSelection.push(
                  `${option[`name_${language}`]}` || option.name_en
                );
            });
          }
          if (armor && armor.length) {
            armor.forEach((option) => {
              option.active &&
                equipmentSelection.push(
                  `${option[`name_${language}`]}` || option.name_en
                );
            });
          }
          if (options && options.length) {
            options.forEach((option) => {
              option.active &&
                equipmentSelection.push(
                  `${option[`name_${language}`]}` || option.name_en
                );
            });
          }

          return `${strength} ${item[`name_${language}`] || name_en}${
            equipmentSelection.length
              ? ` (${equipmentSelection
                  .map((option) => option.replace(", ", " + "))
                  .join(" + ")})`
              : ""
          }`;
        })
    : [];
  const lore = [];
  if (activeLore) {
    lore.push(
      nameMap[activeLore][`name_${language}`] || nameMap[activeLore].name_en
    );
  } else if (lores?.length) {
    lore.push(
      nameMap[lores[0]][`name_${language}`] || nameMap[lores[0]].name_en
    );
  }

  const allOptionsArray = [
    ...allEquipment,
    ...allArmor,
    ...allOptions,
    ...allStackableOptions,
    ...allCommand,
    ...allMounts,
    ...(!noMagic ? allItems : []),
    ...allDetachments,
    ...lore,
  ];
  const allOptionsString = allOptionsArray.join(", ").replace(/\*/g, "");

  if (allOptionsString) {
    if (asString) {
      return allOptionsString;
    }
    return <p>{allOptionsString}</p>;
  }
  return null;
};
