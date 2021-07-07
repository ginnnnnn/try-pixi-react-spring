import * as PIXI from "pixi.js";
import { createSpine } from "./utilty";
import { useEffect, useRef } from "react";

const Animate = () => {
  const divRef = useRef(null);
  useEffect(() => {
    const app = new PIXI.Application({
      width: divRef.current.clientWidth,
      height: divRef.current.clientHeight,
      backgroundAlpha: 0,
    });
    const renderDiv = divRef.current;
    renderDiv.appendChild(app.view);

    window.addEventListener("resize", appResize);
    app.stop();
    app.renderer.plugins.interaction.autoPreventDefault = false;
    app.renderer.view.style.touchAction = "auto";
    // load spine data
    app.loader
      .add([
        "dragon/dragon.json",
        "club_bigWin_anim/club_bigwin.json",
        "club_megaWin_anim/club_megawin.json",
        "club_scatter_anim/club_scatter.json",
        "cash_rocket/CashRocket_fx_anim.json",
      ])
      .load(onAssetsLoaded);

    let dragon = null;
    let bigWin = null;
    let megaWin = null;
    let scatter = null;
    let cashRocket = null;
    let cashRocket2 = null;

    function onAssetsLoaded(loader, res) {
      //dragon
      dragon = createSpine(res, "dragon/dragon.json");
      dragon.position.set(app.screen.width / 2, app.screen.height / 3);
      dragon.scale.set(0.3, 0.3);
      dragon.state.setAnimation(0, "flying", true);
      app.stage.addChild(dragon);

      //
      //bigWin

      bigWin = createSpine(res, "club_bigWin_anim/club_bigwin.json");
      bigWin.position.set(app.screen.width / 2 - 100, app.screen.height / 2);
      bigWin.scale.set(0.3, 0.3);
      bigWin.state.setAnimation(0, "animation", true);
      app.stage.addChild(bigWin);

      //megaWin

      megaWin = createSpine(res, "club_megaWin_anim/club_megawin.json");
      megaWin.position.set(app.screen.width / 2 - 500, app.screen.height / 2);
      megaWin.scale.set(0.3, 0.3);
      megaWin.state.setAnimation(0, "animation", true);
      app.stage.addChild(megaWin);

      //scatter
      scatter = createSpine(res, "club_scatter_anim/club_scatter.json");
      scatter.position.set(app.screen.width / 2, app.screen.height / 2);
      scatter.scale.set(0.5, 0.5);
      scatter.state.setAnimation(0, "animation", true);
      app.stage.addChild(scatter);

      //cashrocket
      cashRocket = createSpine(res, "cash_rocket/CashRocket_fx_anim.json");
      cashRocket.position.set(
        app.screen.width / 2 - 500,
        app.screen.height - 500
      );
      cashRocket.scale.set(0.5, 0.5);
      cashRocket.state.setAnimation(0, "rocket_Boost_Infinite", true);
      cashRocket.interactive = true;
      cashRocket.buttonMode = true;
      cashRocket.on("pointerdown", () => {
        cashRocket.state.setAnimation(0, "rocket_Mid_explode", false);
        cashRocket.state.addAnimation(0, "rocket_Boost_Infinite", true, 0);
      });
      app.stage.addChild(cashRocket);

      //cashrocket
      cashRocket2 = createSpine(res, "cash_rocket/CashRocket_fx_anim.json");
      cashRocket2.position.set(
        app.screen.width / 2 + 500,
        app.screen.height - 500
      );
      cashRocket2.scale.set(0.5, 0.5);
      cashRocket2.interactive = true;
      cashRocket2.buttonMode = true;
      cashRocket2.state.setAnimation(0, "rocket_Boost_Infinite", true);
      cashRocket2.on("pointerdown", () => {
        cashRocket2.state.setAnimation(0, "rocket_start_explode", false);
        cashRocket2.state.addAnimation(0, "rocket_Boost_Infinite", true, 0);
      });
      app.stage.addChild(cashRocket2);

      app.start();
    }
    function appResize(e) {
      app.renderer.autoResize = true;
      app.renderer.resize(
        divRef.current.clientWidth,
        divRef.current.clientHeight
      );
      dragon.position.set(app.screen.width / 2, app.screen.height / 3);
      bigWin.position.set(app.screen.width / 2 - 100, app.screen.height / 2);
      megaWin.position.set(app.screen.width / 2 - 500, app.screen.height / 2);
      scatter.position.set(app.screen.width / 2, app.screen.height / 2);
      cashRocket.position.set(
        app.screen.width / 2 - 500,
        app.screen.height - 500
      );
      cashRocket2.position.set(
        app.screen.width / 2 + 500,
        app.screen.height - 500
      );
    }
    return () => {
      renderDiv.innerHTML = "";
      window.removeEventListener("resize", appResize);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        zIndex: 6,
      }}
      ref={divRef}
    ></div>
  );
};

export default Animate;
