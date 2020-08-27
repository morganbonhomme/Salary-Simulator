export function fetchMatchingCities(data, currentCountry) {
  const matchingCountries = data.country.filter( location => location.name === currentCountry ? location : null);
  const citychoices = matchingCountries.map(country => country.area);
  return citychoices;
};

export function fetchChoices(data, type) {
  return [...new Set(data[type].map(item => item.name))]
}

export function fetchMasterRange(data, currentMasterLevel) {
  const level = data.master.filter(level => level.name === currentMasterLevel ? level : null);
  return level[0].factor
}

export function fetchFactor(data, type, currentValue) {
  const typeValueSelected = data[type].filter(type => type.name === currentValue ? type : null);
  return typeValueSelected[0].factor
}

export function fetchCityFactor (data, currentCountry, currentValue) {
  const typeValueSelected = data.country.filter(type => (type.area === currentValue && type.name === currentCountry) ? type : null);
  return typeValueSelected[0].factor
}

export function salaryCalculation (data, currentValues, rangeFactor ) {
  const jobFactor = fetchFactor(data, 'job', currentValues.job);
  const seniorityFactor = fetchFactor(data, 'seniority', currentValues.seniority);
  const contractFactor = fetchFactor(data, 'contract', currentValues.contract);
  const cityFactor = fetchCityFactor(data, currentValues.country, currentValues.city);
  const masterRangeFactor = parseFloat(rangeFactor);
  const parisBase = (100/60)/100;
  const result = jobFactor * seniorityFactor * contractFactor * cityFactor * masterRangeFactor * parisBase;
  return (Math.round(result/1000) * 1000)
}
