const impact = {};
const severeImpact = {};

const numberOfDaysInAweek = 7;
const numberOfDaysInAmonth = 30;

const calculateFactor = (data) => {
  const daysToDouble = 3;
  if (data.periodType === 'days') {
    return Math.trunc((data.timeToElapse) / daysToDouble);
  }
  if (data.periodType === 'weeks') {
    return Math.trunc((data.timeToElapse * numberOfDaysInAweek) / daysToDouble);
  }
  return Math.trunc((data.timeToElapse * numberOfDaysInAmonth) / daysToDouble);
};


const getCurrentlyAffected = (data) => {
  const impactEffect = data.reportedCases * 10;
  const severeEffect = data.reportedCases * 50;
  impact.currentlyInfected = impactEffect;
  severeImpact.currentlyInfected = severeEffect;
  impact.infectionsByRequestedTime = impactEffect * (2 ** calculateFactor(data));
  severeImpact.infectionsByRequestedTime = severeEffect * (2 ** calculateFactor(data));
};


const getHospitalBedsByRequestedTime = (data) => {
  const impactSevereCases = 0.15 * impact.infectionsByRequestedTime;
  const severeImpactSevereCases = 0.15 * severeImpact.infectionsByRequestedTime;
  impact.severeCasesByRequestedTime = impactSevereCases;
  severeImpact.severeCasesByRequestedTime = severeImpactSevereCases;
  const availableBeds = 0.35 * data.totalHospitalBeds;
  impact.hospitalBedsByRequestedTime = Math.trunc(availableBeds - impactSevereCases);
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(availableBeds - severeImpactSevereCases);
};


const calculatePeriod = (data) => {
  if (data.periodType === 'days') {
    return Math.trunc(data.timeToElapse);
  }
  if (data.periodType === 'weeks') {
    return Math.trunc(data.timeToElapse * numberOfDaysInAweek);
  }
  return Math.trunc(data.timeToElapse * numberOfDaysInAmonth);
};


const calculateDollarsInFlight = (data) => {
  impact.casesForICUByRequestedTime = 0.05 * impact.infectionsByRequestedTime;
  severeImpact.casesForICUByRequestedTime = 0.05 * severeImpact.infectionsByRequestedTime;
  impact.casesForVentilatorsByRequestedTime = 0.02 * impact.infectionsByRequestedTime;
  severeImpact.casesForVentilatorsByRequestedTime = 0.02 * severeImpact.infectionsByRequestedTime;
  impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime
    * data.region.avgDailyIncomePopulation
    * data.region.avgDailyIncomeInUSD) / calculatePeriod(data));
  severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime
  * data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD)
  / calculatePeriod(data));
};


const covid19ImpactEstimator = (data) => {
  getCurrentlyAffected(data);
  getHospitalBedsByRequestedTime(data);
  calculateDollarsInFlight(data);
  return { data, impact, severeImpact };
};


export default covid19ImpactEstimator;
