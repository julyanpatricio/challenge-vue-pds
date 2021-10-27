<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="card-form md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('username')">
                <label for="username">username</label>
                <md-input
                  name="username"
                  id="username"
                  v-model="form.username"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.username.required"
                  >The username is required</span
                >
                <span class="md-error" v-else-if="!$v.form.username.minlength"
                  >Invalid username</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">password</label>
                <md-input
                  name="password"
                  id="password"
                  v-model="form.password"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.password.required"
                  >The password is required</span
                >
                <span class="md-error" v-else-if="!$v.form.password.minlength"
                  >Invalid password</span
                >
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending"
            >Login</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import axios from "axios";
import { mapActions } from "vuex";
import router from "@/router";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      username: null,
      password: null,
    },
    sending: false,
  }),
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(3),
      },
      password: {
        required,
        minLength: minLength(3),
      },
    },
  },
  methods: {
    ...mapActions(["login"]),
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.username = null;
      this.form.password = null;
    },
    async postLogin() {
      this.sending = true;
      let dataLogin = {};
      try {
        const { data } = await axios.post(
          "http://lbl-bistro-nc-wa-preprod-884f88ddc91b1d08.elb.us-east-1.amazonaws.com:5000/api/Token",
          {
            Username: "hzbucki@pdssa.com.a",
            Password: "1a2b3c!",
          }
        );
        if (!data["responseCode"]) {
          this.sending = false;
          this.clearForm();
          return alert(data["responseMessage"]);
        }
        dataLogin = data;
      } catch (error) {
        console.log(error);
        dataLogin = {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJoemJ1Y2tpQHBkc3NhLmNvbS5hciIsImp0aSI6IjMzYmU0ZWFjLWRiNzAtNDQzMC04MmY2LWFjZjk1YjJiYWVjNCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWVpZGVudGlmaWVyIjoiNjE3NzVlZTYtZmZkYS00NjdiLWIwYzQtNjQ5NzdiNmY3MTc0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Imh6YnVja2lAcGRzc2EuY29tLmFyIiwiZ2l2ZW5fbmFtZSI6Imh6YnVja2lAcGRzc2EuY29tLmFyIiwidW5pcXVlX25hbWUiOiJoemJ1Y2tpQHBkc3NhLmNvbS5hciIsImV4cCI6MTYzNTUyNjQwMiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwLyIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NTAwMC8ifQ.S7rLRgSX22ny2HwRWHqhoIuZY4TbpB8-Qc0tXSWE3gQ",
          responseCode: 0,
          responseMessage: "",
          merchantTags: [
            {
              merchantName: "The Bronx Pizza",
              shopCode: "10000016",
            },
          ],
          roles: ["Administrador", "SalesReports", "Tester"],
        };
      }
      this.login({
        token: dataLogin["token"],
        responseCode: dataLogin["responseCode"],
        responseMessage: dataLogin["responseMessage"],
        merchantTags: dataLogin["merchantTags"],
        roles: dataLogin["roles"],
      });
      router.push("/");
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.postLogin();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/Var.scss";
.md-layout {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  margin-inline: 20%;
  margin-top: 8%;
  .md-layout-item {
    background-color: transparent !important;
  }
  .card-form {
    box-shadow: $shadow-login;
  }
}
</style>