export const commission = async (obj, type) => {
  if (type === "list") {
    // map
    obj.length > 0 &&
      obj.map((item) => {
        const agentRate =
          item.agentRate > 0
            ? item.agentRate
            : item.insuranceProvider.agentRate;
        const ourRate =
          item.ourRate > 0 ? item.ourRate : item.insuranceProvider.ourRate;
        item._doc.agentPayee = (item.premiumAmount * agentRate) / 100;
        item._doc.ourPayee = (item.premiumAmount * ourRate) / 100;
        return { ...item._doc };
      });
    return obj;
  } else if (type === "obj") {
    // [obj]
  }
};

export const comissionofAgent = async (obj, type) => {
  if (type === "list") {
    obj.map((item) => {
      const ele = item.policyholderid;
      const agentRate =
        ele.agentRate > 0 ? ele.agentRate : ele.insuranceProvider.agentRate;
      const ourRate =
        ele.ourRate > 0 ? ele.ourRate : ele.insuranceProvider.ourRate;
      item._doc.agentPayee = (ele.premiumAmount * agentRate) / 100;
      item._doc.ourPayee = (ele.premiumAmount * ourRate) / 100;
      return { ...item._doc };
    });
    return obj;
  } else if (type === "obj") {
  }
};
