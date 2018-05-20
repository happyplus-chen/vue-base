<template>
    <div class="crumbs">
        <ul>
            <li v-for="(node, index) in data" :key="index">
                <a href="#">{{node.name}}
                    <span v-if="node.count">{{node.count}}</span>
                </a>

            </li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        { name: 'test1', count: 3 },
        { name: 'test22', count: 0 },
        { name: 'test333', count: 10 },
        { name: 'test444', count: 0 }
      ]
    }
  }
}
</script>

<style scoped>
.crumbs {
  text-align: center;
  height: 30px;
}

.crumbs ul {
  list-style: none;
  display: inline-table;
}
.crumbs ul li {
  display: inline;
}

.crumbs ul li a {
  display: block;
  float: left;
  background: #3498db;
  text-align: center;
  padding: 0px 40px 0 40px;
  position: relative;
  margin: 0 1px 0 0;

  font-size: 20px;
  text-decoration: none;
  color: #fff;
}
.crumbs ul li a:after {
  content: '';
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 15px solid #3498db;
  position: absolute;
  right: -15px;
  top: 0;
  z-index: 1;
}

.crumbs ul li a:before {
  content: '';
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  border-left: 15px solid #d4f2ff;
  position: absolute;
  left: 0;
  top: 0;
}

.crumbs ul li:first-child a {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.crumbs ul li:first-child a:before {
  display: none;
}

.crumbs ul li a span {
  background-color: #f56c6c;
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #ffffff;
  position: absolute;
  top: -16px;
  right: 10px;
}
.crumbs ul li:last-child a:after {
  /* display: none; */
}

.crumbs ul li a:hover {
  background: #fa5ba5;
}
.crumbs ul li a:hover:after {
  border-left-color: #fa5ba5;
}
</style>
