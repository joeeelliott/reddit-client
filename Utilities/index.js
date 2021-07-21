// THIS FILE IS FOR REFACTORED TEST FUNCTIONS THAT WILL BE KEPT IN A GLOBAL STATE AS THEY ARE LIKELY TO BE USED ACROSS MULTIPLE FILES

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper; 
}