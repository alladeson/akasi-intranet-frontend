//https://vuejs.org/api/options-lifecycle.html
import { articles } from "@/utils/Articles";
import { useRoute } from "vue-router";
export default {
  name: "Portefeuille",
  data() {
    return {
      article: {},
      allArticles: "",
    };
  },
  computed: {},
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        let filteredArticles = articles.filter((art) => art.id == toParams.id);
        this.article = filteredArticles[0];
        this.allArticles = articles.filter((art) => art.id != toParams.id);
      }
    );
  },
  mounted() {
    const route = useRoute();
    let filteredArticles = articles.filter((art) => art.id == route.params.id);
    this.article = filteredArticles[0];
    this.allArticles = articles.filter((art) => art.id != route.params.id);
  },
  methods: {},
};
