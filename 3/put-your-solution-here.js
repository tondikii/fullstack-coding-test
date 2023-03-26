function generateTree(array) {
  const tree = {};
  array.sort((e1, e2) => e1.label - e2.label);
  array.forEach((e) => {
    if (e?.parent) {
      if (tree?.label === e?.parent) {
        tree.children.push({
          label: e?.label,
          children: [],
        });
      } else {
        const foundIndex = tree.children.findIndex(
          (eFind) => eFind?.label === e?.parent
        );
        if (foundIndex >= 0) {
          tree.children[foundIndex]?.children.push({
            label: e?.label,
            children: [],
          });
        } else {
          let foundIndexChildren = -1;
          let foundIndexParent = -1;
          tree.children.forEach((each, idx) => {
            const findingIndex = each.children.findIndex(
              (eFindChildren) => eFindChildren?.label === e?.parent
            );
            if (findingIndex >= 0) {
              foundIndexChildren = findingIndex;
              foundIndexParent = idx;
            }
          });
          if (foundIndexChildren >= 0) {
            tree.children[foundIndexParent].children[
              foundIndexChildren
            ].children.push({
              label: e?.label,
              children: [],
            });
          }
        }
      }
    } else {
      tree.label = e?.label;
      tree.children = [];
    }
  });
  return tree;
}
