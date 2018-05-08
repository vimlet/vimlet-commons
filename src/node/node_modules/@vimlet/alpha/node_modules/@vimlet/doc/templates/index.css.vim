html, body {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  overflow: hidden;
  width: 100%;
  min-width: 320px !important;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: #353535;
}
#container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
#tree {
  position: relative;
  width: 300px;
  color: white;
  border-right: 4px solid #484848;
}
#treeData {
  overflow-y: auto;
  height: calc(100% - 55px);
}
.treeLink {
  padding: 5px;
  cursor: pointer;
}
.treeLink:hover {
  background-color: #5d4242;
}
.treeSelected {
  background-color: #923b3b;
}
#treeSearch {
  font-size: 18px;
  width: 100%;
  height: 50px;
  margin-bottom: 5px;
  padding-left: 5px;
  color: white;
  border: none;
  background-color: #525252;
}
.searchInput:focus {
  outline: 2px solid #c3b3b3;
  outline-offset: -2px;
}
#treeSearch::-webkit-search-cancel-button {
  color: white;
  background-color: white;
}
#explorer {
  flex: 1;
}
#explorerIframe {
  width: 100%;
  height: 100%;
  border: none;
}

.menuSearchHide {
  display: none;
}

#hideTreeButton {
  display: none;
  cursor: pointer;
}

.showTreeMobile {
  position: absolute !important;
  /*  width:100% !important;*/
  width: 300px !important;
  height: 100% !important;
  background-color: #353535;
}

@media only screen and (max-width: 720px) {
  #tree {
    width: 20px;
  }
  #hideTreeButton {
    position: absolute;
    z-index: 999;
    top: 0;
    right: 0;
    display: flex;
    width: 20px;
    height: 100%;
    color: white;
    background-color: #484848;
    box-sizing: border-box;
    padding: 5px;

    align-items: center;
  }
}
@media only screen and (min-width: 720px) {
  #tree {
  width: 300px;
  }
  #hideTreeButton {
    display: none;
  }
  .showTreeMobile {
    position: relative !important;
  }
}
