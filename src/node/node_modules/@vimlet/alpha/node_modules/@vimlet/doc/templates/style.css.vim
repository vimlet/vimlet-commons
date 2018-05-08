html, body {
  width: 100%;
  min-width: 400px !important;
  height: 100%;
  margin: 0;
  padding: 0;
font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
background-color: #353535;
}

h1, h2, h3, h4 {
  margin: 0;
}

#menu {
  display:flex;
  position: fixed;
  top: 0;
  width: 100%;
  padding-left: 5px;
  color: white;
  min-width: 400px !important;
  background-color: #923b3b;
  -webkit-box-shadow: 0 2px 5px 0 rgba(0,0,0,0.75);
     -moz-box-shadow: 0 2px 5px 0 rgba(0,0,0,0.75);
          box-shadow: 0 2px 5px 0 rgba(0,0,0,0.75);
}
.menuHover {
    margin-left: -5px;
  position: fixed;
  top: 50px;
  display: none;
  flex-direction: column;
  width: 250px;
  max-height: 300px;
  cursor: default;
  color: white;
  background-color: #6f2323;
  -webkit-box-shadow: 0 2px 5px 0 rgba(0,0,0,0.75);
     -moz-box-shadow: 0 2px 5px 0 rgba(0,0,0,0.75);
          box-shadow: 0 2px 5px 0 rgba(0,0,0,0.75);
}
.subMenuHover {
  line-height: normal;
  cursor: pointer;
  margin:5px 10px 5px 10px;
}
.subMenuHover:hover {
  color: #da7878;
}

#main {
  width: 100%;
  height: 100%;
}


#content {
  box-sizing: border-box;
  width: 100%;
  padding-top: 50px;
  padding-right: 10px;
  padding-left: 10px;
  color:white;
}

#header {
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 10px;
}
#header > h1 {
  margin-bottom: 10px;
}


.hidePrivate {
  display: none !important;
}

#togglePrivate {
  margin-left:auto;
}

/*
.searchContainer {
  padding: 5px;
}*/
.searchInput{
  font-size: 18px;
  width: 100%;
  height: 50px;
  margin-bottom: 5px;
  padding-left: 5px;
  color: white;
  border: none;
  background-color: #923b3b;
}
.searchInput:focus{
  outline: 2px solid #da7878;
  outline-offset: -2px;
}
.menuSearchData{
  overflow-y: auto;
}
/**
 * Used for select all menu properties
 * @type {[type]}
 */
.propertyMenuSearch, .functionMenuSearch{}

.menuSearchHide{
  display:none;
}

.button {
  line-height: 50px;
  display: inline-block;
  min-width: 50px;
  height: 50px;
  margin-right: 5px;
  padding-right: 5px;
  padding-right: 5px;
  padding-left: 5px;
  cursor: pointer;
  /*
  border: 2px solid #000000;
  -webkit-border-radius: 10px 10px 10px 10px;
  -moz-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  */
}
.button:hover {
  color: #da7878;
}

.box {
  /*  background-color: #d0d2d3;*/
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 10px;
  border: 2px solid #525252;
}

.subBox {
  margin: 10px;
  border: 2px solid #525252;
}
.subBoxTitle {
  padding-top: 10px;
  padding-right: 10px;
  /*7border-bottom: 2px solid #525252;*/
  padding-left: 10px;
}

.description {
  font-style: italic;
  display: inline-block;
}
.table {
  margin: 10px;
  border: 2px solid #525252;
}

.row {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.rowBack0 {
    background-color: #585353;
}
.rowBack1 {
    background-color: #4a4646;
}
.rowColumn {
  padding: 5px;
    flex: 1;
}
.rowColumn100 {
  width: 20%;
  min-width: 100px;
  max-width: 250px;
  padding-right: 10px;
}
.tableHeader {
  font-weight: bold;
  border-bottom: 2px solid #525252;
}
.functionDetails .table {
  border: 2px solid #cccccc;
}
.functionDetails .tableHeader {
  border-bottom: 2px solid #cccccc;
}

.link {
  cursor: pointer;
    text-decoration: underline;
}
.link:hover {
  color: #da7878;
}
.margin10 {
  margin: 10px;
}

.showMenuFlex{
  display: flex !important;
}
.showMenuActive{
  background-color: #6f2323;
}

.textColorType{
    color: #deaf6a;
}
.textColorFunction{
    color: #ba6bc7;
}
.textColorName{
    color: #c35542;
}


@media only screen and (max-width: 440px) {
  .hideOnSmallS{
    display:none;
  }
}
