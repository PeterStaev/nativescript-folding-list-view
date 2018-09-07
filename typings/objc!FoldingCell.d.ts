
declare const enum AnimationType {

	Open = 0,

	Close = 1
}

declare class FoldingCell extends UITableViewCell {

	static alloc(): FoldingCell; // inherited from NSObject

	static appearance(): FoldingCell; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): FoldingCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): FoldingCell; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): FoldingCell; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): FoldingCell; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): FoldingCell; // inherited from UIAppearance

	static new(): FoldingCell; // inherited from NSObject

	backViewColor: UIColor;

	containerView: UIView;

	containerViewTop: NSLayoutConstraint;

	durationsForCollapsedState: NSArray<number>;

	durationsForExpandedState: NSArray<number>;

	foregroundView: RotatedView;

	foregroundViewTop: NSLayoutConstraint;

	isUnfolded: boolean;

	itemCount: number;

	animationDurationType(itemIndex: number, type: AnimationType): number;

	commonInit(): void;

	isAnimating(): boolean;

	unfoldAnimatedCompletion(value: boolean, animated: boolean, completion: () => void): void;
}

declare var FoldingCellVersionNumber: number;

declare var FoldingCellVersionString: interop.Reference<number>;

declare class RotatedView extends UIView implements CAAnimationDelegate {

	static alloc(): RotatedView; // inherited from NSObject

	static appearance(): RotatedView; // inherited from UIAppearance

	static appearanceForTraitCollection(trait: UITraitCollection): RotatedView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): RotatedView; // inherited from UIAppearance

	static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject>): RotatedView; // inherited from UIAppearance

	static appearanceWhenContainedIn(ContainerClass: typeof NSObject): RotatedView; // inherited from UIAppearance

	static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject>): RotatedView; // inherited from UIAppearance

	static new(): RotatedView; // inherited from NSObject

	readonly debugDescription: string; // inherited from NSObjectProtocol

	readonly description: string; // inherited from NSObjectProtocol

	readonly hash: number; // inherited from NSObjectProtocol

	readonly isProxy: boolean; // inherited from NSObjectProtocol

	readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

	readonly  // inherited from NSObjectProtocol

	animationDidStart(anim: CAAnimation): void;

	animationDidStopFinished(anim: CAAnimation, flag: boolean): void;

	class(): typeof NSObject;

	conformsToProtocol(aProtocol: any /* Protocol */): boolean;

	isEqual(object: any): boolean;

	isKindOfClass(aClass: typeof NSObject): boolean;

	isMemberOfClass(aClass: typeof NSObject): boolean;

	performSelector(aSelector: string): any;

	performSelectorWithObject(aSelector: string, object: any): any;

	performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

	respondsToSelector(aSelector: string): boolean;

	retainCount(): number;

	self(): this;
}
