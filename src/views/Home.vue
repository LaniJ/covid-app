<template>
  <div class="home p-4">
    <!-- <h3> {{ allCovidData }}</h3> -->

    <h1 class="mt-4">Covid-19 Web Application </h1>
    
    <div class=" statistics ">
      <!-- <h3 >Check Statistics </h3> -->

      <!-- <div class='ml-5'>
      <b-button variant="info" class="mr-1" @click="showGlobalData">Global</b-button>
      <b-button variant="info" class="mr-1">Most Affected Countries</b-button> 

      <b-button variant="secondary" class="ml-1" @click="deleteTodoItem(item.id)">Country</b-button>
      </div> -->
    </div>

    <div class="loader" v-if="isLoading">
        Loading...
    </div>
    <div class="data-grid" v-else>
      <!-- <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <h3> Covid Statistics (Worldwide)</h3>
            <p> Total Covid cases: {{ totalCases}} </p>
            <p> Active cases: {{activeCases}} </p>
            <p> Total recoveries: {{ recoveries }} </p>
            <p> Total deaths: {{ deaths }} </p>
          </b-col>
          <b-col>
        <div>
          <h3>Top Affected Countries</h3>
          <p v-for="item in top3Countries" :key="item.country">
            {{ item.country }} : {{ item.confirmed}}
          </p>
        </div>
          </b-col>
        </b-row>
      </b-container> -->

      <div class="cardContainer mt-4">
        <div class="d-flex justify-content-around">
          <b-card
            title="Covid Statistics (Worldwide)"
            img-src= "https://www.idea.int/sites/default/files/webpage_images/2020-7-7-COVID19-GM-map-promo.png"
            img-alt="Image"
            img-top
            style="max-width: 30rem;"
            class="mb-2"
          >
            <b-card-text> <br>
              Summary of worldwide Covid-19 cases <br> <br>
              <div class="text-left">
                <!-- <h3>Covid Statistics (Worldwide)</h3> -->
                <p> Total Covid cases: <b>{{ totalCases}}</b> </p>
                <p> Active cases: <b>{{activeCases}}</b> </p>
                <p> Total recoveries: <b>{{ recoveries }}</b> </p>
                <p> Total deaths: <b>{{ deaths }}</b> </p>
              </div>
            </b-card-text>
          </b-card>

          <b-card
            title="Top Affected Countries"
            img-src= "https://poetsandquants.com/wp-content/uploads/sites/5/2020/08/country-flags.jpg"
            img-alt="Image"
            img-top
            style="max-width: 25rem;"
            class="mb-2"
          >
            <b-card-text><br>
              These 3 countries suffered the most from Covid <br><br>
              <div>
                <p v-for="item in top3Countries" :key="item.country">
                  {{ item.country }} : <b>{{ item.confirmed}} </b>
                </p>
              </div>
            </b-card-text>
          </b-card>

        <b-card
            title="Total number of cases per region"
            img-src= "https://winspiremagazine.com/wp-content/uploads/2020/08/7-Continents-of-the-world-Winspire-Magazine.jpg"
            img-alt="Image"
            img-top
            style="max-width: 25rem;"
            class="mb-2"
          >
            <b-card-text> <br>
              <div class="text-left">
                <p> Africa: <b>{{ regionalCases["Africa"] }}</b> </p>
                <p> Asia: <b>{{ regionalCases["Asia"] }}</b> </p>
                <p> Europe: <b>{{ regionalCases["Europe"] }}</b> </p>
                <p> North America: <b>{{ regionalCases["North America"] }}</b> </p>
                <p> South America: <b>{{ regionalCases["South America"] }}</b> </p>
                <p> Oceania: <b>{{ regionalCases["Oceania"] }}</b> </p>
              </div>
            </b-card-text>
          </b-card>
        </div>
      </div> <br><br>

      <!-- <div class="d-flex">
        <GlobalData />
      </div> -->

      <!-- <div class="m-auto">

        <h3>Total number of cases per region</h3>
        <p> Africa: {{ regionalCases["Africa"] }} </p>
        <p> Asia: {{ regionalCases["Asia"] }} </p>
        <p> Europe: {{ regionalCases["Europe"] }} </p>
        <p> North America: {{ regionalCases["North America"] }} </p>
        <p> South America: {{ regionalCases["South America"] }} </p>
        <p> Oceania: {{ regionalCases["Oceania"] }} </p>
      </div> -->

      <div class="accordion p-5 group" role="tablist">
        <b-card no-body class="mb-1">
          <b-card-header header-tag="header" class="p-1" role="tab">
            <b-button block v-b-toggle.accordion-1 variant="info"> Country Statistics</b-button>
          </b-card-header>
          <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
            <b-card-body>
              
                <table class="table mt-5">
                  <thead>
                    <tr>
                      <th scope="col">Country</th>
                      <th scope="col">Total Cases</th>
                      <th scope="col">Active Cases</th>
                      <th scope="col">Recoveries</th>
                      <th scope="col">Deaths</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in allCountries" :key="item.country">
                      <td>{{ item.country }}</td>
                      <td>{{ item.confirmed }}</td>
                      <td>{{ item.confirmed - item.recovered - item.deaths }}</td>
                      <td>{{ item.recovered }}</td>
                      <td>{{ item.deaths }}</td>
                    </tr>
                  </tbody>
                </table>                         
            </b-card-body>
          </b-collapse>
        </b-card>
    </div>

    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from 'vuex';
import GlobalData from '@/components/GlobalData.vue'

export default {

  name: 'Home',
  // data: () => ({
  //   isLoading: true,
  //   isHidden: true,
  // }),
  data() {
    return {
      isLoading: true,
      isHidden: true,
    }
  },
  components: {
    GlobalData,
  },
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

<style scoped>
.statistics {
  padding-left: 120px;
  margin-top: 50px;
};
.data-grid {
  display: grid;
};
.cardContainer {
  padding-left: 100px;
  height: 300px;
  widows: 300px;
  display: flex;
};
.group {
  padding: 200px;
}
</style>
