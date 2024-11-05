document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("inicio-sec").style.display = "flex";
    document.getElementById("registro-sec").style.display = "none";
    document.getElementById("web-sec").style.display = "none";

    document.getElementById("ingresar-btn").addEventListener("click", function() {
        document.getElementById("inicio-sec").style.display = "none";
        document.getElementById("web-sec").style.display = "flex";
        document.getElementById("registro-sec").style.display = "none";
        document.getElementById("aportaciones-sec").style.display = "flex";
    });


    document.getElementById("register-btn").addEventListener("click", function() {
        document.getElementById("inicio-sec").style.display = "none";
        document.getElementById("registro-sec").style.display = "flex";
        document.getElementById("web-sec").style.display = "none";
    });

    document.getElementById("perfil-btn").addEventListener("click", function() {
        document.getElementById("perfil-sec").style.display = "flex";
        document.getElementById("aportaciones-sec").style.display = "none";
        document.getElementById("casilleros-sec").style.display = "none";
    });

    document.getElementById("aportaciones-btn").addEventListener("click", function() {
        document.getElementById("perfil-sec").style.display = "none";
        document.getElementById("aportaciones-sec").style.display = "flex";
        document.getElementById("casilleros-sec").style.display = "none";
    });

    document.getElementById("casilleros-btn").addEventListener("click", function() {
        document.getElementById("perfil-sec").style.display = "none";
        document.getElementById("aportaciones-sec").style.display = "none";
        document.getElementById("casilleros-sec").style.display = "flex";
    });

    document.getElementById("logout-btn").addEventListener("click", function() {
        document.getElementById("inicio-sec").style.display = "flex";
        document.getElementById("registro-sec").style.display = "none";
        document.getElementById("web-sec").style.display = "none";
    });
});