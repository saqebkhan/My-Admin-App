<template>
  <div>
    <div v-if="!isAthenticated">
      <h2
        style="
          font-family: sans-serif;
          color: gray;
          text-align: center;
          font-weight: bold;
          margin: 25px;
        "
      >
        Welcome to my App
      </h2>
      <div>
        <input type="text" placeholder="Search by name" v-model="search" />
        <div
          class="card"
          v-for="(item, index) in filteredItems"
          :key="item._id"
        >
          <div class="card-content">
            <!-- <v-col> -->
            <h2>{{ index + 1 }}</h2>
            <h5>{{ item.name }}</h5>
            <p>Lorem ipsum dolor sit amet.</p>
            <!-- </v-col> -->
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <form @submit.prevent="createItem">
        <input
          type="text"
          v-model="search"
          placeholder="Search"
          v-if="isAthenticated"
          style="width: 80%"
        />
        <input
          class="create-input"
          type="text"
          v-model="newItem.name"
          placeholder="Name"
          v-if="isAthenticated"
          style="width: 80%"
        />
        <button
          type="submit"
          v-if="isAthenticated"
          style="color: white; margin: 10px"
        >
          Create
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Name</th>
            <th colspan="3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in filteredItems" :key="item._id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>
              <input
                type="text"
                v-model="item.name"
                @keyup.enter="updateItem(item)"
                ref="myInput"
              />
            </td>
            <td>
              <button @click="updateItem(item)">
                {{ loading ? "loading" : "Update" }}
              </button>
            </td>
            <td>
              <button @click="deleteItem(item)">
                {{ loading ? "loading" : "Delete" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, computed } from "vue";

export default {
  props: ["isAthenticated"],
  setup() {
    const items = ref([]);
    const newItem = ref({ name: "" });
    const loading = ref(false);
    const search = ref("");
    const getItems = async () => {
      const response = await fetch("http://localhost:5000/myCollection");
      items.value = await response.json();
      console.log(response, "Items res");
    };
    const filteredItems = computed(() => {
      let result = items.value.filter((ele) => {
        return ele.name.includes(search.value);
      });
      return result;
    });

    const createItem = async () => {
      const response = await fetch("http://localhost:5000/myCollection", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem.value),
      });
      const item = await response.json();
      items.value.push(item);
      newItem.value = { name: "" };
    };

    const updateItem = async (item) => {
      await fetch(`http://localhost:5000/myCollection/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      //   const updatedItem = await response.json();
      //   const itemIndex = items.value.findIndex((i) => i._id === item._id);
      //   items.value.splice(itemIndex, 1, updatedItem);
      alert("Update Success");
      getItems();
    };

    const deleteItem = async (item) => {
      loading.value = true;
      try {
        await fetch(`http://localhost:5000/myCollection/${item._id}`, {
          method: "DELETE",
        });
      } catch (err) {
        console.log(err, "err");
      }
      loading.value = false;
      getItems();
      //   const itemIndex = this.items.findIndex(i => i._id === item._id);
      //   this.items.splice(itemIndex, 1);
    };
    onMounted(() => {
      getItems();
    });

    return {
      items,
      newItem,
      loading,
      getItems,
      createItem,
      updateItem,
      deleteItem,
      filteredItems,
      search,
    };
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
  max-width: 800px;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  border-left: 1px salmon;
}
th,
td {
  /* text-align: left; */
  padding: 8px;
  border: 1px solid salmon;
}
th {
  background-color: #6a5acd;
  color: #fff;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
tr:hover {
  background-color: #ddd;
}
input[type="text"] {
  width: 90%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 4px;
  /* box-sizing: border-box; */
}
button {
  background-color: #6a5acd;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
button:hover {
  background-color: #483d8b;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.card {
  width: 20%;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  display: inline-block;
  margin: 1rem;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
}

.card::before {
  content: "";
  display: block;
  position: absolute;
  top: -20px;
  right: -20px;
  bottom: -20px;
  left: -20px;
  background: linear-gradient(
    to bottom right,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  filter: blur(40px);
  z-index: -1;
}

.card-content {
  padding: 1rem;
}
/* div {
  display: flex;
  text-align: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  border-radius: 20px;
} */
</style>
