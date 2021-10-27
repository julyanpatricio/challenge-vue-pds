<template>
  <draggable v-model="cards" draggable=".card" class="cards">
    <div
      v-for="(element, i) in cards"
      :key="i"
      class="card"
      :class="element['responseCode'] ? 'danger' : 'success'"
    >
      <md-card md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">
              {{ element["system"] || element["sistema"] || "Mercadopago" }}
            </div>
          </md-card-header>

          <md-card-content>
            {{ element["responseMessage"] }}
          </md-card-content>
        </md-ripple>
      </md-card>
    </div>
  </draggable>
</template>

<script>
import { mapState } from "vuex";
import router from "@/router";
import axios from "axios";
import draggable from "vuedraggable";

export default {
  name: "Home",

  components: {
    draggable,
  },

  data() {
    return {
      cards: [],
    };
  },

  computed: {
    ...mapState(["token"]),
  },

  methods: {
    updateData() {
      // const newCards = await Promise.all([
      //   axios.get(
      //     "http://lbl-mercadopago-webapi-prod-043d988d8fd60062.elb.us-east-1.amazonaws.com:5000/api/check"
      //   ),
      //   axios.get(
      //     "http://lbl-tst-bistro-prod-39cf18e24a143687.elb.us-east-1.amazonaws.com:5001/api/check"
      //   ),
      //   axios.get(
      //     "http://lbl-tst-bistro-prod-39cf18e24a143687.elb.us-east-1.amazonaws.com:5000/api/check"
      //   ),
      //   axios.get(
      //     "http://lbl-bistro-nc-wa-preprod-884f88ddc91b1d08.elb.us-east-1.amazonaws.com:5000/api/check"
      //   ),
      // ]);

      const newCards = [
        {
          version: "1.23.17",
          responseCode: Math.round(Math.random()),
          responseMessage: "27/10/2021 04:34:03",
        },
        {
          version: "1.87.0",
          sistema: "ShopTracking",
          responseCode: Math.round(Math.random()),
          responseMessage: "27/10/2021 04:36:33",
        },
        {
          version: "1.173.0",
          sistema: "TechServiceTracking",
          responseCode: Math.round(Math.random()),
          responseMessage: "27/10/2021 04:36:50",
        },
        {
          version: "1.73.0",
          system: "BistroWebApi",
          responseCode: Math.round(Math.random()),
          responseMessage: "27/10/2021 04:36:57",
        },
      ];

      if (!this.cards.length) {
        return (this.cards = newCards);
      }
      
      this.cards = this.cards.map((element) => newCards.find(card => card.version === element.version));
      
    },
  },

  async created() {
    if (!this.token.length) {
      router.push("/login");
    }
    this.updateData();
  },

  watch: {
    cards: function () {
      setTimeout(() => {
        this.data = this.updateData();
      }, 2000);
    },
  },
};
</script>


<style lang="scss" scoped>
@import "@/Var.scss";
.cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-inline: 10%;
  margin-top: 5%;

  .card {
    width: 35rem;
    margin: 2%;
    text-align: center;
  }
  .danger {
    box-shadow: $shadow-danger;
  }
  .success {
    box-shadow: $shadow-success;
  }
}
</style>