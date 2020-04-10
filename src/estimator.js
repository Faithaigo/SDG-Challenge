const impact = {};
const severeImpact = {};

const calculateFactor = (data) =>{
  const daysToDouble = 3;
  const numberOfDaysInAweek = 7;
  const numberOfDaysInAmonth = 30;
  if (data.periodType === 'days') {
    return Math.floor((data.timeToElapse) / daysToDouble);
  }
  if (data.periodType === 'weeks') {
    return Math.floor((data.timeToElapse * numberOfDaysInAweek) / daysToDouble);
  }
  else {
    return Math.floor((data.timeToElapse * numberOfDaysInAmonth) / daysToDouble);
  }
};
const getCurrentlyAffected = (data) => {
  const impactEffect = data.reportedCases * 10;
  const severeEffect = data.reportedCases * 50;
  impact.currentlyInfected = impactEffect;
  severeImpact.currentlyInfected = severeEffect;
  impact.infectionsByRequestedTime = impactEffect * (2 ** calculateFactor(data));
  severeImpact.infectionsByRequestedTime = severeEffect * (2 ** calculateFactor(data));
  return { impact, severeImpact };
};

const covid19ImpactEstimator = (data) => {
  getCurrentlyAffected(data);
  return { data, impact, severeImpact };
};


export default covid19ImpactEstimator;
