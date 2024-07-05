//https://vuejs.org/api/options-lifecycle.html
import { nouvelles } from "@/nouvels/Nouvelles";
import { useRoute } from "vue-router";
export default {
  name: "Nouvellebpm",
  data() {
    return {
      nouve: {},
      allNews: "",
    };
  },
  computed: {},
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        let filteredNouvelles = nouvelles.filter((nou) => nou.id == toParams.id);
        this.nouve = filteredNouvelles[0];
        this.allNews = nouvelles.filter((nou) => nou.id != toParams.id);
      }
    );
  },
  mounted() {
    const route = useRoute();
    let filteredNouvelles = nouvelles.filter((nou) => nou.id == route.params.id
    );
    this.nouve = filteredNouvelles[0];
    this.allNews = nouvelles.filter((nou) => nou.id != route.params.id);
  },
  methods: {},
};
