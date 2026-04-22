import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { use, useEffect, useMemo, useRef, useState } from "react";
import { SelectedModifiers } from "@/types/cart";
import { Item, ModifierGroup } from "@/types/menu";
import { getModifierGroups } from "@/lib/menuStorage";
import { ThemedText } from "./defaults/themed-text";
import ModifierSelectionComponent from "./ModifierSelectionComponent";

export default function ModifiersList({
  selectedModifiers,
  setSelectedModifiers,
  item,
}: {
  selectedModifiers: SelectedModifiers;
  setSelectedModifiers: React.Dispatch<React.SetStateAction<SelectedModifiers>>;
  item: Item;
}) {
  const allModsRef = useRef<ModifierGroup[]>([]);
  const [modifiers, setModifiers] = useState<ModifierGroup[]>([]);

  useEffect(() => {
    loadModifiers();
  }, [item]);

  useEffect(() => {
    console.log("selected modifiers", selectedModifiers);
  }, [selectedModifiers]);

  const loadModifiers = async () => {
    const modifiers = await getModifierGroups();
    const groups =
      (item.modifierGroupIds?.map((id) =>
        modifiers.find((m) => m.id === id),
      ) as ModifierGroup[]) || null;
    console.log("groups", groups);
    setModifiers(groups || []);
    allModsRef.current = groups || [];
  };

  const filteredModifiers = useMemo(() => {
    const size = selectedModifiers["size"]?.[0];
    if(size !== "half") return modifiers;
     setSelectedModifiers((prev) => {
          const bread = prev.bread?.[0];

          if (bread !== "french" && bread !== "wheat") {
            return {
              ...prev,
              bread: ["french"],
            };
          }

          return prev;
        });
    return modifiers.map((g) => {
      if(g.id !== "bread") return g;
      return {
        ...g,
        options: g.options.filter((o) =>["french", "wheat"].includes(o.id))
      }
    })
  }, [modifiers, selectedModifiers])

  const handleSelectionChange = (group: ModifierGroup, optionId: string) => {
    // if (group.id === "size") {
    //   if (optionId === "half") {
    //     setModifiers((prev) =>
    //       prev.map((g) => {
    //         if (g.id !== "bread") return g;
    //         return {
    //           ...g,
    //           options: g.options.filter(
    //             (o) => o.id === "french" || o.id === "wheat",
    //           ),
    //         };
    //       }),
    //     );
    //     setSelectedModifiers((prev) => {
    //       const bread = prev.bread?.[0];

    //       if (bread !== "french" && bread !== "wheat") {
    //         return {
    //           ...prev,
    //           bread: ["french"],
    //         };
    //       }

    //       return prev;
    //     });
    //   } else if (optionId === "full") {
    //     setModifiers(allModsRef.current);
    //   }
    // }

    setSelectedModifiers((prev) => {
      const current = prev[group.id] || [];

      if (group.type === "single") {
        return {
          ...prev,
          [group.id]: [optionId],
        };
      }

      // multi select
      const exists = current.includes(optionId);

      return {
        ...prev,
        [group.id]: exists
          ? current.filter((id) => id !== optionId)
          : [...current, optionId],
      };
    });
    console.log("change detected");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBanner}>
        <ThemedText style={styles.headerText}>Modifiers</ThemedText>
      </View>

      {filteredModifiers.map((group) => (
        <ModifierSelectionComponent
          key={group.id}
          item={item}
          group={group}
          handleSelectionChange={handleSelectionChange}
          selectedModifiers={selectedModifiers}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
  },
  headerBanner: {
    padding: 10,
    backgroundColor: "rgba(104, 33, 29)",
  },
  headerText: {
    color: "white",
    fontWeight: 300,
    fontSize: 20,
    paddingHorizontal: 10,
  },
});
