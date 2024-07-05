<template>
  <label :for="selectName">
    {{ label }} <span class="text-danger" v-show="required">*</span>
  </label>
  <v-select
    :name="selectName"
    :label="selectOptionText"
    v-model="selected"
    :reduce="(option) => option.uuid"
    :options="selectOptionItems"
    :required="selectOptionRequired"
    :multiple="selectOptionMultiple"
    :class="customClass ? customClass : ''"
  />
</template>

<script>
import "vue-select/dist/vue-select.css";
export default {
  props: {
    customClass: {
      type: String,
      default: "",
    },
    selectOptionItems: {
      type: Array,
      default: () => [],
    },
    //Text à afficher pour l'utilisateur dans le option : text
    selectOptionText: {
      type: String,
      default: "",
    },
    //Valeur à afficher dans le option : value
    /*selectOptionKey: {
                type: String,
                default: '',
            },*/
    //Nom du select
    selectName: {
      type: String,
      default: "",
    },
    selectOptionMultiple: {
      type: Boolean,
      default: false,
    },
    selectOptionRequired: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selected: null,
    };
  },
};
</script>

<!--
https://vue-select.org/guide/values.html#getting-and-setting
https://stackoverflow.com/questions/42874314/vuejs-conditionally-add-an-attribute-for-an-element
<input :required="test">   // if true
<input :required="!test">  // if false
<input :required="!!test"> // test ? true : false
-->
