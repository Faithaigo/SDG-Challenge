import covid19ImpactEstimator from './estimator';

const population = document.querySelector('[data-population]');
const timeToElapse = document.querySelector('[data-time-to-elapse]');
const reportedCases = document.querySelector('[data-reported-cases]');
const totalHospitalBeds = document.querySelector('[data-total-hospital-beds]');
const periodType = document.querySelector('[data-period-type]');
const estimateButton = document.querySelector('[data-go-estimate]');

estimateButton.addEventListener('click', ($event) => {
  $event.preventDefault();
  const formData = {
    population: +(population.value),
    timeToElapse: +(timeToElapse.value),
    reportedCases: +(reportedCases.value),
    totalHospitalBeds: +(totalHospitalBeds.value),
    periodType: periodType.value
  };
  covid19ImpactEstimator(formData);
});
