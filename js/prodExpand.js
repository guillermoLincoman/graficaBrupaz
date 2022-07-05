const contPrincipal = document.querySelector(".page");
const prodExpand = document.querySelector("#prodExpan");
const contProd = document.querySelector("#card");
var contCard = contProd.getElementsByTagName('.card');
const objImg = [`
    <div class="item">
      <img src="./images/escala/fajasade.png"/>
    </div>`,
    `<div class="item">
      <img src="./images/escala/estallidos1.jpg"/>
    </div>
    <div class="item">
      <img src="./images/escala/estallidos2.jpg"/>
    </div>
    <div class="item">
      <img src="./images/escala/estallidos3.jpg"/>
    </div>
    <div class="item">
      <img src="./images/escala/imagen6.jpg"/>
    </div>`,
    `<div class="item">
      <img src="./images/escala/ofertas1.png"/>
    </div>
    <div class="item">
      <img src="./images/escala/ofertas2.png"/>
    </div>`,  
    `<div class="item">
      <img src="./images/escala/altoImpacto1.png"/>
    </div>
    <div class="item">
      <img src="./images/escala/altoImpacto2.png"/>
    </div>
    <div class="item">
      <img src="./images/escala/altoImpacto3.png"/>
    </div>
    <div class="item">
      <img src="./images/escala/altoImpacto4.png"/>
    </div>
    <div class="item">
      <img src="./images/escala/altoImpacto5.png"/>
    </div>
    <div class="item">
      <img src="./images/escala/altoImpacto6.png"/>
    </div>
    <div class="item">
      <img src="./images/escala/altoImpacto7.png"/>
    </div>`,
    `<div class="item">
      <img src="./images/imagen10.jpg"/>
    </div>
    <div class="item">
      <img src="./images/imagen11.jpg"/>
    </div>
    <div class="item">
      <img src="./images/sticker3.jpg"/>
    </div>
    <div class="item">
      <img src="./images/imagen11.jpg"/>
    </div>
    
    `];
cargarEventListeners()
function cargarEventListeners(){
    document.addEventListener('DOMContentLoaded', init);
    contProd.addEventListener('click', expandirProd);
}

function init(){
  desaparece();
}

function expandirProd(e){
  e.preventDefault();
  for (let i = 0; i < 5; i++) {
    if(e.path[0].dataset.set == i) 
    {
      console.log(`Datos que necesito`);
      console.log(`Nombre: ${e.path[2].children[1].children[0].innerText}`);
      console.log(`Descripcion: ${e.path[3].children[1].children[3].children[0].innerText}`);
      aparece();
      //8. Agrego las redes sociales
      const prodExp= document.createElement("div");
      prodExp.classList.add("container");
      prodExp.style.paddingTop = "48px"
      prodExp.innerHTML= `
      <div class="heading-section">
        <h2>Detalles del Producto</h2>
      </div>
      <div class="row">
        <!--Imagenes-->
        <div class="col-md-6">
          <!--Imagen Slider-->
          <div id="slider" class="owl-carousel product-slider">
            ${objImg[e.path[0].dataset.set]}
          </div>
          <!--Imagen preview-->
          <div id="thumb" class="owl-carousel product-thumb">
            ${objImg[e.path[0].dataset.set]}
          </div>
        </div>
        <div class="col-md-6">
          <div class="product-dtl">
            <div class="product-info">
              <div class="product-price-discount">
                <h3>${e.path[2].children[1].children[0].innerText}</h3>
              </div>
              <h3 class="uno">Diseños | <span class="dos">Varios</span></h3>
            </div>
            <p>${e.path[3].children[1].children[3].children[0].innerText}</p>
            <div class="marginTop ">
              <a class="button button-primary marginTop" href="productos.html">VOLVER</a>
            </div>      
          </div>
        </div>
      </div>
      `;
      prodExpand.insertBefore(prodExp, prodExpand.firstChild);
      $(document).ready(function() {
        var slider = $("#slider");
        var thumb = $("#thumb");
        var slidesPerPage = 4; //globaly define number of elements per page
        var syncedSecondary = true;
        slider.owlCarousel({
            items: 1,
            slideSpeed: 2000,
            nav: false,
            autoplay: false, 
            dots: false,
            loop: true,
            responsiveRefreshRate: 200
        }).on('changed.owl.carousel', syncPosition);
        thumb
            .on('initialized.owl.carousel', function() {
                thumb.find(".owl-item").eq(0).addClass("current");
            })
            .owlCarousel({
                items: slidesPerPage,
                dots: false,
                nav: true,
                item: 4,
                smartSpeed: 200,
                slideSpeed: 500,
                slideBy: slidesPerPage, 
                responsiveRefreshRate: 100
            }).on('changed.owl.carousel', syncPosition2);
        function syncPosition(el) {
            var count = el.item.count - 1;
            var current = Math.round(el.item.index - (el.item.count / 2) - .5);
            if (current < 0) {
                current = count;
            }
            if (current > count) {
                current = 0;
            }
            thumb
                .find(".owl-item")
                .removeClass("current")
                .eq(current)
                .addClass("current");
            var onscreen = thumb.find('.owl-item.active').length - 1;
            var start = thumb.find('.owl-item.active').first().index();
            var end = thumb.find('.owl-item.active').last().index();
            if (current > end) {
                thumb.data('owl.carousel').to(current, 100, true);
            }
            if (current < start) {
                thumb.data('owl.carousel').to(current - onscreen, 100, true);
            }
        }
        function syncPosition2(el) {
            if (syncedSecondary) {
                var number = el.item.index;
                slider.data('owl.carousel').to(number, 100, true);
            }
        }
        thumb.on("click", ".owl-item", function(e) {
            e.preventDefault();
            var number = $(this).index();
            slider.data('owl.carousel').to(number, 300, true);
        });
        $(".qtyminus").on("click",function(){
            var now = $(".qty").val();
            if ($.isNumeric(now)){
                if (parseInt(now) -1> 0)
                { now--;}
                $(".qty").val(now);
            }
        })            
        $(".qtyplus").on("click",function(){
            var now = $(".qty").val();
            if ($.isNumeric(now)){
                $(".qty").val(parseInt(now)+1);
            }
        });
      });
      break;
    }
  }
}
function aparece(){
  prodExpand.style.display = "block";
  contPrincipal.style.display = "none";
}
function desaparece(){
  prodExpand.style.display = "none";
  contPrincipal.style.display = "block";
}