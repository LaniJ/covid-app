<template>
  <div class="home">
    <!-- <h3> {{ allCovidData }}</h3> -->
    <div class="loader" v-if="isLoading">
        Loading...
    </div>
    <div class="news-grid" v-else>
      <h2>Covid Statistics (Worldwide)</h2>
      <p> Total Covid cases: {{ totalCases}} </p>
      <p> Active cases: {{activeCases}} </p>
      <p> total recoveries are: {{ recoveries }} </p>
      <p> total deaths are: {{ deaths }} </p>

      <div>
        <h3>Top Affected Countries</h3>
        <p v-for="item in top3Countries" :key="item.country">
          {{ item.country }} : {{ item.confirmed}}
        </p>
      </div>
      
      <div>
        <h2>Total number of cases per region</h2>
        <h3> Africa: {{ regionalCases["Africa"] }} </h3>
        <h3> Asia: {{ regionalCases["Asia"] }} </h3>
        <h3> Europe: {{ regionalCases["Europe"] }} </h3>
        <h3> North America: {{ regionalCases["North America"] }} </h3>
        <h3> South America: {{ regionalCases["South America"] }} </h3>
        <h3> Oceania: {{ regionalCases["Oceania"] }} </h3>
      </div>

      <div>
        <table>
          <tr>
            <th>Country</th>
            <th>Total Cases</th>
            <th>Active Cases</th>
            <th>Recoveries</th>
            <th>Deaths</th>
          </tr>
          <tr v-for="item in allCountries" :key="item.country">
            <td>{{ item.country }}</td>
            <td>{{ item.confirmed }}</td>
            <td>{{ item.confirmed - item.recovered - item.deaths }}</td>
            <td>{{ item.recovered }}</td>
            <td>{{ item.deaths }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex';

export default {

  name: 'Home',
  data: () => ({
    isLoading: true,
  }),
  watch: {
    allCovidData: {
      deep: true,
      handler() {
        this.isLoading = false;
      },
    },
  },
  mounted() {
    this.fetchCases();
    this.fetchCasesByContinent()
  },
  computed: {
    ...mapGetters(['allCovidData', 'totalCases', 'activeCases', 'recoveries', 'deaths', 'top3Countries', 'regionalCases', 'allCountries']),
  },
  methods: {
    ...mapActions(['fetchCases', 'fetchCasesByContinent']),
  },
};
</script>
