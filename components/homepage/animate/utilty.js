import { Spine } from "pixi-spine";

export const createSpine = (res, path) => {
  const spine = new Spine(res[path].spineData);
  spine.skeleton.setToSetupPose();
  spine.autoUpdate = true;
  return spine;
};
