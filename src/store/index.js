import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rawData: {},
    totalCasesWordwide: 0,
    activeCasesWordwide: 0,
    totalRecoveriesWordwide: 0,
    totalDeathsWordwide: 0,
    top3Countries: [],
    totalCasesPerRegion: {
      Europe: 0, 'North America': 0, 'South America': 0, Asia: 0, Africa: 0, Oceania: 0,
    },
    allCountries: []
  },
  mutations: {
    setRawData: (state, payload) => { state.rawData = payload; },
    setTotalCasesWorldwide: (state, payload) => { state.totalCasesWordwide = payload; },
    setActiveCasesWorldwide: (state, payload) => { state.activeCasesWordwide = payload; },
    setTotalRecoveriesWordwide: (state, payload) => { state.totalRecoveriesWordwide = payload; },
    setTotalDeathsWordwide: (state, payload) => { state.totalDeathsWordwide = payload; },
    setTop3Countries: (state, payload) => { state.top3Countries = payload; },
    setTotalCasesPerRegion: (state, payload) => { state.totalCasesPerRegion = payload },
    setAllCountries: (state, payload) => { state.allCountries = payload }
  },
  actions: {
    fetchCasesByContinent:({ commit, state }, payload) => {
      const apiURL = 'https://covid-api.mmediagroup.fr/v1/cases'
      const continentNames = Object.keys(state.totalCasesPerRegion)
      const promises = continentNames.map( continent => fetch(`${apiURL}?continent=${continent}`))
      Promise.all(promises)
      .then((responses)=> {
        const jsonPromises = responses.map(response => response.json())
        return Promise.all(jsonPromises)
      }).then((continentDataList) => {
        const casesPerRegion = {}
        continentNames.forEach((continent, index) => {  
          const continentData = continentDataList[index]
          let totalCases = 0

          Object.keys(continentData).forEach((country) => {
            const countryData = continentData[country].All
            totalCases += countryData.confirmed
          })
          casesPerRegion[continent] = totalCases
        })
        commit('setTotalCasesPerRegion', casesPerRegion);

        console.log(continentDataList);
        console.log(casesPerRegion);
      })
    },

    fetchCases: ({ commit, state }, payload) => {
      const apiURL = 'https://covid-api.mmediagroup.fr/v1/cases'
      fetch(apiURL)
      .then((response) => response.json())      
      .then((rawData) => {

        const dataAsList = []

        Object.keys(rawData).forEach((country) => {
          if (country == 'Global') {
            return 
          }
          const countryData = rawData[country].All
          dataAsList.push(countryData)
          
        })
        // sort in decending order
        dataAsList.sort((countryData1, countryData2) => {
          return countryData2.confirmed - countryData1.confirmed
        })
        
        let activeCases = rawData.Global.All.confirmed - rawData.Global.All.deaths - rawData.Global.All.recovered
        // state.rawData.all
        commit('setRawData', rawData);
        commit('setTotalCasesWorldwide', rawData.Global.All.confirmed);
        commit('setActiveCasesWorldwide', activeCases)
        commit('setTotalRecoveriesWordwide', rawData.Global.All.recovered)
        commit('setTotalDeathsWordwide', rawData.Global.All.deaths)
        commit('setTop3Countries', [dataAsList[0], dataAsList[1], dataAsList[2]])
        commit('setAllCountries', dataAsList)
      })
    }
  },
  getters: {
    allCovidData: (state) => state.rawData,
    totalCases: (state) => state.totalCasesWordwide,
    activeCases: (state) => state.activeCasesWordwide,
    recoveries: (state) => state.totalRecoveriesWordwide,
    deaths: (state) => state.totalDeathsWordwide,
    top3Countries: (state) => state.top3Countries,
    regionalCases: (state) => state.totalCasesPerRegion,
    allCountries: (state) => state.allCountries
  },
  modules: {
  },
});
