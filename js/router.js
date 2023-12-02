export class Router{
  routes = {};

  add(routeName, linkPage){
    this.routes[routeName] = linkPage;
  }

  route(event){
    event = event || window.event;
    event.preventDefault();
  
    window.history.pushState({}, "", event.target.href);
  
    this.handle();
  }

  handle(){
    const { pathname } = window.location;
    const route = this.routes[pathname] || this.routes[404];
    
    fetch(route).then(data => data.text()).then(html => {
      if(pathname == "/") {
        this.handleElementsPageHome(html);
      } else if(pathname == "/theUniverse") {
        this.handleElementsPageTheUniverse(html);
      } else if(pathname == "/exploracao"){
        this.handleElementsPageExploracao(html);
      } else {
        document.querySelector("#app").innerHTML = html;
      }
    });
  }

  handleElementsPageHome(html){
    document.querySelector("#container").style.display = "flex";
    document.querySelector("#container-home").innerHTML = html;
    document.querySelector("#container-wrapper").innerHTML = "";
    document.querySelector("#teste").style.display = "none";
    document.querySelector("#app").style.background = "url(/assets/mountains-universe-1.png)";
  }

  handleElementsPageTheUniverse(html){
    document.querySelector("#container").style.display = "none";
    document.querySelector("#container-home").innerHTML = "";
    document.querySelector("#container-wrapper").innerHTML = html;
    document.querySelector("#teste").style.display = "flex";
    document.querySelector("#app").style.background = "url(/assets/mountains-universe-2.png)";
  }

  handleElementsPageExploracao(html){
    document.querySelector("#container").style.display = "none";
    document.querySelector("#container-home").innerHTML = "";
    document.querySelector("#container-wrapper").innerHTML = html;
    document.querySelector("#teste").style.display = "flex";
    document.querySelector("#app").style.background = "url(/assets/mountains-universe-3.png)";
  }
}