<template>
    <div class="global">
        <h2>Covid Statistics (Worldwide)</h2>
        <p> Total Covid cases: {{ totalCases}} </p>
        <p> Active cases: {{activeCases}} </p>
        <p> total recoveries are: {{ recoveries }} </p>
        <p> total deaths are: {{ deaths }} </p>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'GlobalData',
    computed: {
    ...mapGetters([ 'totalCases', 'activeCases', 'recoveries', 'deaths' ]),
    },
    methods: {
        ...mapActions(['fetchCases', 'fetchCasesByContinent']),
    },
}
</script>