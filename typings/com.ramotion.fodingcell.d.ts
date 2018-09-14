declare module com {
	export module ramotion {
		export module foldingcell {
			export class BuildConfig extends java.lang.Object {
				public static class: java.lang.Class<com.ramotion.foldingcell.BuildConfig>;
				public static DEBUG: boolean;
				public static APPLICATION_ID: string;
				public static BUILD_TYPE: string;
				public static FLAVOR: string;
				public static VERSION_CODE: number;
				public static VERSION_NAME: string;
				public constructor();
			}
		}
	}
}

declare module com {
	export module ramotion {
		export module foldingcell {
			export class FoldingCell extends globalAndroid.widget.RelativeLayout {
				public static class: java.lang.Class<com.ramotion.foldingcell.FoldingCell>;
				public childDrawableStateChanged(param0: globalAndroid.view.View): void;
				public requestDisallowInterceptTouchEvent(param0: boolean): void;
				public startCollapseHeightAnimation(param0: java.util.ArrayList<java.lang.Integer>, param1: number): void;
				public requestChildFocus(param0: globalAndroid.view.View, param1: globalAndroid.view.View): void;
				public clearChildFocus(param0: globalAndroid.view.View): void;
				public onKeyDown(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
				public updateViewLayout(param0: globalAndroid.view.View, param1: globalAndroid.view.ViewGroup.LayoutParams): void;
				public addView(param0: globalAndroid.view.View, param1: globalAndroid.view.ViewGroup.LayoutParams): void;
				public createContextMenu(param0: globalAndroid.view.ContextMenu): void;
				public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number, param3: number);
				public createImageViewFromBitmap(param0: globalAndroid.graphics.Bitmap): globalAndroid.widget.ImageView;
				public isLayoutRequested(): boolean;
				public sendAccessibilityEvent(param0: number): void;
				public onStartNestedScroll(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: number): boolean;
				public focusSearch(param0: globalAndroid.view.View, param1: number): globalAndroid.view.View;
				public onKeyUp(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
				public requestFitSystemWindows(): void;
				public getTextDirection(): number;
				public onKeyMultiple(param0: number, param1: number, param2: globalAndroid.view.KeyEvent): boolean;
				public measureViewAndGetBitmap(param0: globalAndroid.view.View, param1: number): globalAndroid.graphics.Bitmap;
				public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable): void;
				public requestTransparentRegion(param0: globalAndroid.view.View): void;
				public invalidateChild(param0: globalAndroid.view.View, param1: globalAndroid.graphics.Rect): void;
				public startActionModeForChild(param0: globalAndroid.view.View, param1: globalAndroid.view.ActionMode.Callback): globalAndroid.view.ActionMode;
				public getChildVisibleRect(param0: globalAndroid.view.View, param1: globalAndroid.graphics.Rect, param2: globalAndroid.graphics.Point): boolean;
				public onNestedFling(param0: globalAndroid.view.View, param1: number, param2: number, param3: boolean): boolean;
				public toggle(param0: boolean): void;
				public createAndPrepareFoldingContainer(): globalAndroid.widget.LinearLayout;
				public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
				public getTextAlignment(): number;
				public getParentForAccessibility(): globalAndroid.view.ViewParent;
				public prepareViewsForAnimation(param0: java.util.ArrayList<java.lang.Integer>, param1: globalAndroid.graphics.Bitmap, param2: globalAndroid.graphics.Bitmap): java.util.ArrayList<com.ramotion.foldingcell.views.FoldingCellView>;
				public createAnimationChain(param0: java.util.List<globalAndroid.view.animation.Animation>, param1: globalAndroid.view.View): void;
				public addView(param0: globalAndroid.view.View, param1: number): void;
				public startExpandHeightAnimation(param0: java.util.ArrayList<java.lang.Integer>, param1: number): void;
				public requestChildRectangleOnScreen(param0: globalAndroid.view.View, param1: globalAndroid.graphics.Rect, param2: boolean): boolean;
				public isTextDirectionResolved(): boolean;
				public onNestedPreFling(param0: globalAndroid.view.View, param1: number, param2: number): boolean;
				public onNestedPreScroll(param0: globalAndroid.view.View, param1: number, param2: number, param3: native.Array<number>): void;
				public calculateHeightsForAnimationParts(param0: number, param1: number, param2: number): java.util.ArrayList<java.lang.Integer>;
				public recomputeViewAttributes(param0: globalAndroid.view.View): void;
				public isLayoutDirectionResolved(): boolean;
				public addView(param0: globalAndroid.view.View, param1: number, param2: number): void;
				public isTextAlignmentResolved(): boolean;
				public onNestedScrollAccepted(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: number): void;
				public notifySubtreeAccessibilityStateChanged(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: number): void;
				public getLayoutDirection(): number;
				public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
				public removeView(param0: globalAndroid.view.View): void;
				public canResolveTextDirection(): boolean;
				public canResolveTextAlignment(): boolean;
				public initialize(animationDuration: number, backSideColor: number, additionalFlipsCount: number): void;
				public initialize(cameraHeight: number, animationDuration: number, backSideColor: number, additionalFlipsCount: number): void;
				public createBackSideView(param0: number): globalAndroid.widget.ImageView;
				public childHasTransientStateChanged(param0: globalAndroid.view.View, param1: boolean): void;
				public focusSearch(param0: number): globalAndroid.view.View;
				public showContextMenuForChild(param0: globalAndroid.view.View): boolean;
				public requestLayout(): void;
				public onKeyLongPress(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
				public constructor(param0: globalAndroid.content.Context);
				public bringChildToFront(param0: globalAndroid.view.View): void;
				public startFoldAnimation(param0: java.util.ArrayList<com.ramotion.foldingcell.views.FoldingCellView>, param1: globalAndroid.view.ViewGroup, param2: number, param3: com.ramotion.foldingcell.animations.AnimationEndListener): void;
				public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
				public fold(param0: boolean): void;
				public isUnfolded(): boolean;
				public requestSendAccessibilityEvent(param0: globalAndroid.view.View, param1: globalAndroid.view.accessibility.AccessibilityEvent): boolean;
				public onNestedScroll(param0: globalAndroid.view.View, param1: number, param2: number, param3: number, param4: number): void;
				public setStateToFolded(): void;
				public focusableViewAvailable(param0: globalAndroid.view.View): void;
				public invalidateChildInParent(param0: native.Array<number>, param1: globalAndroid.graphics.Rect): globalAndroid.view.ViewParent;
				public canResolveLayoutDirection(): boolean;
				public addView(param0: globalAndroid.view.View): void;
				public invalidateDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
				public sendAccessibilityEventUnchecked(param0: globalAndroid.view.accessibility.AccessibilityEvent): void;
				public startUnfoldAnimation(param0: java.util.ArrayList<com.ramotion.foldingcell.views.FoldingCellView>, param1: globalAndroid.view.ViewGroup, param2: number, param3: com.ramotion.foldingcell.animations.AnimationEndListener): void;
				public scheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable, param2: number): void;
				public onStopNestedScroll(param0: globalAndroid.view.View): void;
				public unfold(param0: boolean): void;
				public getParent(): globalAndroid.view.ViewParent;
				public addView(param0: globalAndroid.view.View, param1: number, param2: globalAndroid.view.ViewGroup.LayoutParams): void;
			}
		}
	}
}

declare module com {
	export module ramotion {
		export module foldingcell {
			export module animations {
				export abstract class AnimationEndListener extends java.lang.Object implements globalAndroid.view.animation.Animation.AnimationListener {
					public static class: java.lang.Class<com.ramotion.foldingcell.animations.AnimationEndListener>;
					public onAnimationRepeat(param0: globalAndroid.view.animation.Animation): void;
					public onAnimationEnd(param0: globalAndroid.view.animation.Animation): void;
					public constructor();
					public onAnimationStart(param0: globalAndroid.view.animation.Animation): void;
				}
			}
		}
	}
}

declare module com {
	export module ramotion {
		export module foldingcell {
			export module animations {
				export class FoldAnimation extends globalAndroid.view.animation.Animation {
					public static class: java.lang.Class<com.ramotion.foldingcell.animations.FoldAnimation>;
					public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
					public toString(): string;
					public initialize(param0: number, param1: number, param2: number, param3: number): void;
					public constructor();
					public constructor(param0: com.ramotion.foldingcell.animations.FoldAnimation.FoldAnimationMode, param1: number, param2: number);
					public withAnimationListener(param0: globalAndroid.view.animation.Animation.AnimationListener): com.ramotion.foldingcell.animations.FoldAnimation;
					public applyTransformation(param0: number, param1: globalAndroid.view.animation.Transformation): void;
					public withStartOffset(param0: number): com.ramotion.foldingcell.animations.FoldAnimation;
					public withInterpolator(param0: globalAndroid.view.animation.Interpolator): com.ramotion.foldingcell.animations.FoldAnimation;
				}
				export module FoldAnimation {
					export class FoldAnimationMode {
						public static class: java.lang.Class<com.ramotion.foldingcell.animations.FoldAnimation.FoldAnimationMode>;
						public static FOLD_UP: com.ramotion.foldingcell.animations.FoldAnimation.FoldAnimationMode;
						public static UNFOLD_DOWN: com.ramotion.foldingcell.animations.FoldAnimation.FoldAnimationMode;
						public static FOLD_DOWN: com.ramotion.foldingcell.animations.FoldAnimation.FoldAnimationMode;
						public static UNFOLD_UP: com.ramotion.foldingcell.animations.FoldAnimation.FoldAnimationMode;
						public static values(): native.Array<com.ramotion.foldingcell.animations.FoldAnimation.FoldAnimationMode>;
						public static valueOf(param0: string): com.ramotion.foldingcell.animations.FoldAnimation.FoldAnimationMode;
						public static valueOf(param0: java.lang.Class<any>, param1: string): java.lang.Enum<any>;
					}
				}
			}
		}
	}
}

declare module com {
	export module ramotion {
		export module foldingcell {
			export module animations {
				export class HeightAnimation extends globalAndroid.view.animation.Animation {
					public static class: java.lang.Class<com.ramotion.foldingcell.animations.HeightAnimation>;
					public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
					public toString(): string;
					public initialize(param0: number, param1: number, param2: number, param3: number): void;
					public constructor();
					public constructor(param0: globalAndroid.view.View, param1: number, param2: number, param3: number);
					public withInterpolator(param0: globalAndroid.view.animation.Interpolator): com.ramotion.foldingcell.animations.HeightAnimation;
					public applyTransformation(param0: number, param1: globalAndroid.view.animation.Transformation): void;
					public willChangeBounds(): boolean;
					public isFillEnabled(): boolean;
				}
			}
		}
	}
}

declare module com {
	export module ramotion {
		export module foldingcell {
			export module views {
				export class FoldingCellView extends globalAndroid.widget.RelativeLayout {
					public static class: java.lang.Class<com.ramotion.foldingcell.views.FoldingCellView>;
					public invalidateChildInParent(param0: native.Array<number>, param1: globalAndroid.graphics.Rect): globalAndroid.view.ViewParent;
					public focusSearch(param0: number): globalAndroid.view.View;
					public focusableViewAvailable(param0: globalAndroid.view.View): void;
					public createContextMenu(param0: globalAndroid.view.ContextMenu): void;
					public isLayoutRequested(): boolean;
					public isTextDirectionResolved(): boolean;
					public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
					public isLayoutDirectionResolved(): boolean;
					public addView(param0: globalAndroid.view.View, param1: number, param2: number): void;
					public animateFrontView(param0: globalAndroid.view.animation.Animation): void;
					public onKeyUp(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
					public addView(param0: globalAndroid.view.View): void;
					public addView(param0: globalAndroid.view.View, param1: number, param2: globalAndroid.view.ViewGroup.LayoutParams): void;
					public focusSearch(param0: globalAndroid.view.View, param1: number): globalAndroid.view.View;
					public recomputeViewAttributes(param0: globalAndroid.view.View): void;
					public onNestedPreFling(param0: globalAndroid.view.View, param1: number, param2: number): boolean;
					public clearChildFocus(param0: globalAndroid.view.View): void;
					public withBackView(param0: globalAndroid.view.View): com.ramotion.foldingcell.views.FoldingCellView;
					public onNestedScroll(param0: globalAndroid.view.View, param1: number, param2: number, param3: number, param4: number): void;
					public getLayoutDirection(): number;
					public getChildVisibleRect(param0: globalAndroid.view.View, param1: globalAndroid.graphics.Rect, param2: globalAndroid.graphics.Point): boolean;
					public bringChildToFront(param0: globalAndroid.view.View): void;
					public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable): void;
					public requestTransparentRegion(param0: globalAndroid.view.View): void;
					public onKeyLongPress(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
					public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number, param3: number);
					public childDrawableStateChanged(param0: globalAndroid.view.View): void;
					public getTextDirection(): number;
					public scheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable, param1: java.lang.Runnable, param2: number): void;
					public requestFitSystemWindows(): void;
					public notifySubtreeAccessibilityStateChanged(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: number): void;
					public getParent(): globalAndroid.view.ViewParent;
					public isTextAlignmentResolved(): boolean;
					public startActionModeForChild(param0: globalAndroid.view.View, param1: globalAndroid.view.ActionMode.Callback): globalAndroid.view.ActionMode;
					public canResolveTextAlignment(): boolean;
					public childHasTransientStateChanged(param0: globalAndroid.view.View, param1: boolean): void;
					public canResolveTextDirection(): boolean;
					public updateViewLayout(param0: globalAndroid.view.View, param1: globalAndroid.view.ViewGroup.LayoutParams): void;
					public requestChildFocus(param0: globalAndroid.view.View, param1: globalAndroid.view.View): void;
					public onStartNestedScroll(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: number): boolean;
					public requestDisallowInterceptTouchEvent(param0: boolean): void;
					public onNestedFling(param0: globalAndroid.view.View, param1: number, param2: number, param3: boolean): boolean;
					public addView(param0: globalAndroid.view.View, param1: number): void;
					public unscheduleDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
					public addView(param0: globalAndroid.view.View, param1: globalAndroid.view.ViewGroup.LayoutParams): void;
					public constructor(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: globalAndroid.content.Context);
					public invalidateChild(param0: globalAndroid.view.View, param1: globalAndroid.graphics.Rect): void;
					public getBackView(): globalAndroid.view.View;
					public onNestedPreScroll(param0: globalAndroid.view.View, param1: number, param2: number, param3: native.Array<number>): void;
					public sendAccessibilityEvent(param0: number): void;
					public requestLayout(): void;
					public requestSendAccessibilityEvent(param0: globalAndroid.view.View, param1: globalAndroid.view.accessibility.AccessibilityEvent): boolean;
					public getParentForAccessibility(): globalAndroid.view.ViewParent;
					public onKeyDown(param0: number, param1: globalAndroid.view.KeyEvent): boolean;
					public canResolveLayoutDirection(): boolean;
					public getTextAlignment(): number;
					public withFrontView(param0: globalAndroid.view.View): com.ramotion.foldingcell.views.FoldingCellView;
					public onNestedScrollAccepted(param0: globalAndroid.view.View, param1: globalAndroid.view.View, param2: number): void;
					public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
					public showContextMenuForChild(param0: globalAndroid.view.View): boolean;
					public sendAccessibilityEventUnchecked(param0: globalAndroid.view.accessibility.AccessibilityEvent): void;
					public onKeyMultiple(param0: number, param1: number, param2: globalAndroid.view.KeyEvent): boolean;
					public removeView(param0: globalAndroid.view.View): void;
					public constructor(param0: globalAndroid.content.Context);
					public getFrontView(): globalAndroid.view.View;
					public onStopNestedScroll(param0: globalAndroid.view.View): void;
					public invalidateDrawable(param0: globalAndroid.graphics.drawable.Drawable): void;
					public requestChildRectangleOnScreen(param0: globalAndroid.view.View, param1: globalAndroid.graphics.Rect, param2: boolean): boolean;
				}
			}
		}
	}
}