const impact = {};
const severeImpact = {};

const calculateFactor = (data) => {
  const daysToDouble = 3;
  const numberOfDaysInAweek = 7;
  const numberOfDaysInAmonth = 30;
  if (data.periodType === 'days') {
    return Math.floor((data.timeToElapse) / daysToDouble);
  }
  if (data.periodType === 'weeks') {
    return Math.floor((data.timeToElapse * numberOfDaysInAweek) / daysToDouble);
  }
  return Math.floor((data.timeToElapse * numberOfDaysInAmonth) / daysToDouble);
};


const getCurrentlyAffected = (data) => {
  const impactEffect = Math.floor(data.reportedCases * 10);
  const severeEffect = Math.floor(data.reportedCases * 50);
  impact.currentlyInfected = impactEffect;
  severeImpact.currentlyInfected = severeEffect;
  impact.infectionsByRequestedTime = impactEffect * (2 ** calculateFactor(data));
  severeImpact.infectionsByRequestedTime = severeEffect * (2 ** calculateFactor(data));
  return { impact, severeImpact };
};

const getHospitalBedsByRequestedTime = (data) => {
  const impactSevereCases = Math.floor(0.15 * impact.infectionsByRequestedTime);
  const severeImpactSevereCases = Math.floor(0.15 * severeImpact.infectionsByRequestedTime);
  impact.severeCasesByRequestedTime = impactSevereCases;
  severeImpact.severeCasesByRequestedTime = severeImpactSevereCases;
  const availableBeds = Math.floor(0.35 * data.totalHospitalBeds);
  impact.hospitalBedsByRequestedTime = Math.floor(availableBeds - impactSevereCases);
  severeImpact.hospitalBedsByRequestedTime = Math.floor(availableBeds - severeImpactSevereCases);
};

const covid19ImpactEstimator = (data) => {
  getCurrentlyAffected(data);
  getHospitalBedsByRequestedTime(data);
  return { data, impact, severeImpact };
};


export default covid19ImpactEstimator;
