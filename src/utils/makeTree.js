import * as flat from 'flat';

// This file contain functions that handles making tree-skeleton object from json input (heart of tree view logic)

const flattenObj = (obj) => {     // make object flat (no nested objects)
    const afterFlat = flat(obj);
    return afterFlat;
};


const fromFlatToPath = (flatObj) => {   // take names and paths from flat object and save it in array
    const readyObj = [];

    for (let l in flatObj) {
        readyObj.push({
            name: flatObj[l],
            path: l
        });
    }
    return readyObj;
};

const tree = (orderedObj) => {  
    // this is the part where stuff gets serious -> recursively create tree-skeleton (result object will have nested objects as specified by orderedObject.path)

    const tree = orderedObj.reduce((prev, curr) => {
        const branches = curr.path.split('.');
        let branch = prev;
        let branchName;
        let indent = 0;

        while (branches.length) {
        branchName = branches.shift();

        let rootIndex = branch.length ? branch.findIndex(el => el.name === branchName) : -1;

        let Path2 = '';
        let currentlyInv = curr.path.split('.');
        currentlyInv.forEach((el, i) => {
                if (i <= currentlyInv.indexOf(branchName)) {
                    Path2 += `.${el}`;
                }
        });

        if (rootIndex === -1) {
            let newBranch = {
            name: branchName,
            indent,
            children: [],
            path: Path2.slice(1)
            };
            branch = branch[branch.push(newBranch) - 1].children;
            indent += 1;
        } else {
            branch = branch[rootIndex].children;
        }
    
        if (branches.length === 0) {

            if (!isNaN(curr.path[curr.path.length-1])) {        // check if last character is a number (and so there is an array)
                branch.push({
                    name: curr.name,
                    indent
                    });
            } else {
                branch.push({
                    indent
                    });
            }  
        }
        }
  
    return prev;
  }, []);

  return tree;
};

export default (obj) => {
    const flatObj = flattenObj(obj);
    const ordered = fromFlatToPath(flatObj);
    const treeObj = tree(ordered);

    return treeObj;
};
