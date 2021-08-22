const _ = require("lodash");

const calc = ({ uiDefId, isCalculated, value }, localState = {}) => {
  // 1st: check for specific calc function
  if (_.includes(isCalculated, "show_condition_sectionID")) {
    // Check the clicked value (checked or unchecked)
    if (!_.isNull(value)) {
      // Checked: save an array of sectionIDs as an array to this uiDefId
      const sectionIDs = _.split(isCalculated.replace(/\s+/g, ""), ",");
      sectionIDs.shift();
      localState[uiDefId] = sectionIDs;
    } else if (_.isNull(value) && !_.isUndefined(localState[uiDefId])) {
      // Unchecked: if the uiDefId exists in localState, if so: set to null
      localState[uiDefId] = null;
    }

    console.log("\n");
    console.log("Local_State: ", localState);
    console.log("\n");
    // take localState info and convert to an array. Place this inside of the componentDidUpdate
    return [...new Set(_.flatten(_.values(_.pickBy(localState, _.identity))))];
  }
};
console.log(
  calc({
    uiDefId: 24,
    isCalculated: "show_condition_sectionID, 5, 7, 8",
    value: "true",
  })
);
console.log("\n");
console.log(
  calc({
    uiDefId: 24,
    isCalculated: "show_condition_sectionID, 5, 7, 8",
    value: null,
  })
);
console.log(
  calc(
    {
      uiDefId: 24,
      isCalculated: "show_condition_sectionID, 5, 7, 8",
      value: "true",
    },
    { [27]: ["6", "8"] }
  )
);
console.log(
  calc(
    {
      uiDefId: 28,
      isCalculated: "show_condition_sectionID, 5, 7, 8",
      value: null,
    },
    { [28]: ["6", "8"], [6]: ["1", "3"] }
  )
);
