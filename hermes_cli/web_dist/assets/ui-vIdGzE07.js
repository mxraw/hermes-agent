import { n as __toESM, t as __commonJSMin } from "./rolldown-runtime-BPOCksWG.js";
import { h as require_react, m as require_react_dom, p as require_client, t as require_jsx_runtime } from "./react-vendor-KEpZRUr8.js";
//#region node_modules/clsx/dist/clsx.mjs
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function r$3(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r$3(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r$3(e)) && (n && (n += " "), n += t);
	return n;
}
//#endregion
//#region node_modules/class-variance-authority/dist/index.mjs
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
/**
* Copyright 2022 Joe Bell. All rights reserved.
*
* This file is licensed to you under the Apache License, Version 2.0
* (the "License"); you may not use this file except in compliance with the
* License. You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
* WARRANTIES OR REPRESENTATIONS OF ANY KIND, either express or implied. See the
* License for the specific language governing permissions and limitations under
* the License.
*/ var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx;
var cva = (base, config) => (props) => {
	var _config_compoundVariants;
	if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
	const { variants, defaultVariants } = config;
	const getVariantClassNames = Object.keys(variants).map((variant) => {
		const variantProp = props === null || props === void 0 ? void 0 : props[variant];
		const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
		if (variantProp === null) return null;
		const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
		return variants[variant][variantKey];
	});
	const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
		let [key, value] = param;
		if (value === void 0) return acc;
		acc[key] = value;
		return acc;
	}, {});
	return cx(base, getVariantClassNames, config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
		let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
		return Object.entries(compoundVariantOptions).every((param) => {
			let [key, value] = param;
			return Array.isArray(value) ? value.includes({
				...defaultVariants,
				...propsWithoutUndefined
			}[key]) : {
				...defaultVariants,
				...propsWithoutUndefined
			}[key] === value;
		}) ? [
			...acc,
			cvClass,
			cvClassName
		] : acc;
	}, []), props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
//#endregion
//#region node_modules/tailwind-merge/dist/bundle-mjs.mjs
/**
* Concatenates two arrays faster than the array spread operator.
*/
var concatArrays = (array1, array2) => {
	const combinedArray = new Array(array1.length + array2.length);
	for (let i = 0; i < array1.length; i++) combinedArray[i] = array1[i];
	for (let i = 0; i < array2.length; i++) combinedArray[array1.length + i] = array2[i];
	return combinedArray;
};
var createClassValidatorObject = (classGroupId, validator) => ({
	classGroupId,
	validator
});
var createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
	nextPart,
	validators,
	classGroupId
});
var CLASS_PART_SEPARATOR = "-";
var EMPTY_CONFLICTS = [];
var ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
var createClassGroupUtils = (config) => {
	const classMap = createClassMap(config);
	const { conflictingClassGroups, conflictingClassGroupModifiers } = config;
	const getClassGroupId = (className) => {
		if (className.startsWith("[") && className.endsWith("]")) return getGroupIdForArbitraryProperty(className);
		const classParts = className.split(CLASS_PART_SEPARATOR);
		return getGroupRecursive(classParts, classParts[0] === "" && classParts.length > 1 ? 1 : 0, classMap);
	};
	const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
		if (hasPostfixModifier) {
			const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
			const baseConflicts = conflictingClassGroups[classGroupId];
			if (modifierConflicts) {
				if (baseConflicts) return concatArrays(baseConflicts, modifierConflicts);
				return modifierConflicts;
			}
			return baseConflicts || EMPTY_CONFLICTS;
		}
		return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
	};
	return {
		getClassGroupId,
		getConflictingClassGroupIds
	};
};
var getGroupRecursive = (classParts, startIndex, classPartObject) => {
	if (classParts.length - startIndex === 0) return classPartObject.classGroupId;
	const currentClassPart = classParts[startIndex];
	const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
	if (nextClassPartObject) {
		const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
		if (result) return result;
	}
	const validators = classPartObject.validators;
	if (validators === null) return;
	const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
	const validatorsLength = validators.length;
	for (let i = 0; i < validatorsLength; i++) {
		const validatorObj = validators[i];
		if (validatorObj.validator(classRest)) return validatorObj.classGroupId;
	}
};
/**
* Get the class group ID for an arbitrary property.
*
* @param className - The class name to get the group ID for. Is expected to be string starting with `[` and ending with `]`.
*/
var getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	const content = className.slice(1, -1);
	const colonIndex = content.indexOf(":");
	const property = content.slice(0, colonIndex);
	return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
/**
* Exported for testing only
*/
var createClassMap = (config) => {
	const { theme, classGroups } = config;
	return processClassGroups(classGroups, theme);
};
var processClassGroups = (classGroups, theme) => {
	const classMap = createClassPartObject();
	for (const classGroupId in classGroups) {
		const group = classGroups[classGroupId];
		processClassesRecursively(group, classMap, classGroupId, theme);
	}
	return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
	const len = classGroup.length;
	for (let i = 0; i < len; i++) {
		const classDefinition = classGroup[i];
		processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
	}
};
var processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (typeof classDefinition === "string") {
		processStringDefinition(classDefinition, classPartObject, classGroupId);
		return;
	}
	if (typeof classDefinition === "function") {
		processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
		return;
	}
	processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
var processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
	const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
	classPartObjectToEdit.classGroupId = classGroupId;
};
var processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (isThemeGetter(classDefinition)) {
		processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
		return;
	}
	if (classPartObject.validators === null) classPartObject.validators = [];
	classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
var processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	const entries = Object.entries(classDefinition);
	const len = entries.length;
	for (let i = 0; i < len; i++) {
		const [key, value] = entries[i];
		processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
	}
};
var getPart = (classPartObject, path) => {
	let current = classPartObject;
	const parts = path.split(CLASS_PART_SEPARATOR);
	const len = parts.length;
	for (let i = 0; i < len; i++) {
		const part = parts[i];
		let next = current.nextPart.get(part);
		if (!next) {
			next = createClassPartObject();
			current.nextPart.set(part, next);
		}
		current = next;
	}
	return current;
};
var isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
var createLruCache = (maxCacheSize) => {
	if (maxCacheSize < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let cacheSize = 0;
	let cache = Object.create(null);
	let previousCache = Object.create(null);
	const update = (key, value) => {
		cache[key] = value;
		cacheSize++;
		if (cacheSize > maxCacheSize) {
			cacheSize = 0;
			previousCache = cache;
			cache = Object.create(null);
		}
	};
	return {
		get(key) {
			let value = cache[key];
			if (value !== void 0) return value;
			if ((value = previousCache[key]) !== void 0) {
				update(key, value);
				return value;
			}
		},
		set(key, value) {
			if (key in cache) cache[key] = value;
			else update(key, value);
		}
	};
};
var IMPORTANT_MODIFIER = "!";
var MODIFIER_SEPARATOR = ":";
var EMPTY_MODIFIERS = [];
var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
	modifiers,
	hasImportantModifier,
	baseClassName,
	maybePostfixModifierPosition,
	isExternal
});
var createParseClassName = (config) => {
	const { prefix, experimentalParseClassName } = config;
	/**
	* Parse class name into parts.
	*
	* Inspired by `splitAtTopLevelOnly` used in Tailwind CSS
	* @see https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
	*/
	let parseClassName = (className) => {
		const modifiers = [];
		let bracketDepth = 0;
		let parenDepth = 0;
		let modifierStart = 0;
		let postfixModifierPosition;
		const len = className.length;
		for (let index = 0; index < len; index++) {
			const currentCharacter = className[index];
			if (bracketDepth === 0 && parenDepth === 0) {
				if (currentCharacter === MODIFIER_SEPARATOR) {
					modifiers.push(className.slice(modifierStart, index));
					modifierStart = index + 1;
					continue;
				}
				if (currentCharacter === "/") {
					postfixModifierPosition = index;
					continue;
				}
			}
			if (currentCharacter === "[") bracketDepth++;
			else if (currentCharacter === "]") bracketDepth--;
			else if (currentCharacter === "(") parenDepth++;
			else if (currentCharacter === ")") parenDepth--;
		}
		const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
		let baseClassName = baseClassNameWithImportantModifier;
		let hasImportantModifier = false;
		if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
			baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
			hasImportantModifier = true;
		} else if (baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)) {
			baseClassName = baseClassNameWithImportantModifier.slice(1);
			hasImportantModifier = true;
		}
		const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
		return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
	};
	if (prefix) {
		const fullPrefix = prefix + MODIFIER_SEPARATOR;
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
	}
	if (experimentalParseClassName) {
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => experimentalParseClassName({
			className,
			parseClassName: parseClassNameOriginal
		});
	}
	return parseClassName;
};
/**
* Sorts modifiers according to following schema:
* - Predefined modifiers are sorted alphabetically
* - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
*/
var createSortModifiers = (config) => {
	const modifierWeights = /* @__PURE__ */ new Map();
	config.orderSensitiveModifiers.forEach((mod, index) => {
		modifierWeights.set(mod, 1e6 + index);
	});
	return (modifiers) => {
		const result = [];
		let currentSegment = [];
		for (let i = 0; i < modifiers.length; i++) {
			const modifier = modifiers[i];
			const isArbitrary = modifier[0] === "[";
			const isOrderSensitive = modifierWeights.has(modifier);
			if (isArbitrary || isOrderSensitive) {
				if (currentSegment.length > 0) {
					currentSegment.sort();
					result.push(...currentSegment);
					currentSegment = [];
				}
				result.push(modifier);
			} else currentSegment.push(modifier);
		}
		if (currentSegment.length > 0) {
			currentSegment.sort();
			result.push(...currentSegment);
		}
		return result;
	};
};
var createConfigUtils = (config) => ({
	cache: createLruCache(config.cacheSize),
	parseClassName: createParseClassName(config),
	sortModifiers: createSortModifiers(config),
	postfixLookupClassGroupIds: createPostfixLookupClassGroupIds(config),
	...createClassGroupUtils(config)
});
var createPostfixLookupClassGroupIds = (config) => {
	const lookup = Object.create(null);
	const classGroupIds = config.postfixLookupClassGroups;
	if (classGroupIds) for (let i = 0; i < classGroupIds.length; i++) lookup[classGroupIds[i]] = true;
	return lookup;
};
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
	const { parseClassName, getClassGroupId, getConflictingClassGroupIds, sortModifiers, postfixLookupClassGroupIds } = configUtils;
	/**
	* Set of classGroupIds in following format:
	* `{importantModifier}{variantModifiers}{classGroupId}`
	* @example 'float'
	* @example 'hover:focus:bg-color'
	* @example 'md:!pr'
	*/
	const classGroupsInConflict = [];
	const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
	let result = "";
	for (let index = classNames.length - 1; index >= 0; index -= 1) {
		const originalClassName = classNames[index];
		const { isExternal, modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
		if (isExternal) {
			result = originalClassName + (result.length > 0 ? " " + result : result);
			continue;
		}
		let hasPostfixModifier = !!maybePostfixModifierPosition;
		let classGroupId;
		if (hasPostfixModifier) {
			classGroupId = getClassGroupId(baseClassName.substring(0, maybePostfixModifierPosition));
			const classGroupIdWithPostfix = classGroupId && postfixLookupClassGroupIds[classGroupId] ? getClassGroupId(baseClassName) : void 0;
			if (classGroupIdWithPostfix && classGroupIdWithPostfix !== classGroupId) {
				classGroupId = classGroupIdWithPostfix;
				hasPostfixModifier = false;
			}
		} else classGroupId = getClassGroupId(baseClassName);
		if (!classGroupId) {
			if (!hasPostfixModifier) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			classGroupId = getClassGroupId(baseClassName);
			if (!classGroupId) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			hasPostfixModifier = false;
		}
		const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
		const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
		const classId = modifierId + classGroupId;
		if (classGroupsInConflict.indexOf(classId) > -1) continue;
		classGroupsInConflict.push(classId);
		const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
		for (let i = 0; i < conflictGroups.length; ++i) {
			const group = conflictGroups[i];
			classGroupsInConflict.push(modifierId + group);
		}
		result = originalClassName + (result.length > 0 ? " " + result : result);
	}
	return result;
};
/**
* The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
*
* Specifically:
* - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
* - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
*
* Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
*/
var twJoin = (...classLists) => {
	let index = 0;
	let argument;
	let resolvedValue;
	let string = "";
	while (index < classLists.length) if (argument = classLists[index++]) {
		if (resolvedValue = toValue(argument)) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
var toValue = (mix) => {
	if (typeof mix === "string") return mix;
	let resolvedValue;
	let string = "";
	for (let k = 0; k < mix.length; k++) if (mix[k]) {
		if (resolvedValue = toValue(mix[k])) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
var createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
	let configUtils;
	let cacheGet;
	let cacheSet;
	let functionToCall;
	const initTailwindMerge = (classList) => {
		configUtils = createConfigUtils(createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst()));
		cacheGet = configUtils.cache.get;
		cacheSet = configUtils.cache.set;
		functionToCall = tailwindMerge;
		return tailwindMerge(classList);
	};
	const tailwindMerge = (classList) => {
		const cachedResult = cacheGet(classList);
		if (cachedResult) return cachedResult;
		const result = mergeClassList(classList, configUtils);
		cacheSet(classList, result);
		return result;
	};
	functionToCall = initTailwindMerge;
	return (...args) => functionToCall(twJoin(...args));
};
var fallbackThemeArr = [];
var fromTheme = (key) => {
	const themeGetter = (theme) => theme[key] || fallbackThemeArr;
	themeGetter.isThemeGetter = true;
	themeGetter.themeKey = key;
	return themeGetter;
};
var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix|color|light-dark)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isFraction = (value) => fractionRegex.test(value);
var isNumber = (value) => !!value && !Number.isNaN(Number(value));
var isInteger = (value) => !!value && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var isAny = () => true;
var isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
var isNamedContainerQuery = (value) => value.startsWith("@container") && (value[10] === "/" && value[11] !== void 0 || value[11] === "s" && value[16] !== void 0 && value.startsWith("-size/", 10) || value[11] === "n" && value[18] !== void 0 && value.startsWith("-normal/", 10));
var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
var isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
var isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
var isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
var getIsArbitraryValue = (value, testLabel, testValue) => {
	const result = arbitraryValueRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return testValue(result[2]);
	}
	return false;
};
var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
	const result = arbitraryVariableRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return shouldMatchNoLabel;
	}
	return false;
};
var isLabelPosition = (label) => label === "position" || label === "percentage";
var isLabelImage = (label) => label === "image" || label === "url";
var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
var isLabelLength = (label) => label === "length";
var isLabelNumber = (label) => label === "number";
var isLabelFamilyName = (label) => label === "family-name";
var isLabelWeight = (label) => label === "number" || label === "weight";
var isLabelShadow = (label) => label === "shadow";
var getDefaultConfig = () => {
	/**
	* Theme getters for theme variable namespaces
	* @see https://tailwindcss.com/docs/theme#theme-variable-namespaces
	*/
	const themeColor = fromTheme("color");
	const themeFont = fromTheme("font");
	const themeText = fromTheme("text");
	const themeFontWeight = fromTheme("font-weight");
	const themeTracking = fromTheme("tracking");
	const themeLeading = fromTheme("leading");
	const themeBreakpoint = fromTheme("breakpoint");
	const themeContainer = fromTheme("container");
	const themeSpacing = fromTheme("spacing");
	const themeRadius = fromTheme("radius");
	const themeShadow = fromTheme("shadow");
	const themeInsetShadow = fromTheme("inset-shadow");
	const themeTextShadow = fromTheme("text-shadow");
	const themeDropShadow = fromTheme("drop-shadow");
	const themeBlur = fromTheme("blur");
	const themePerspective = fromTheme("perspective");
	const themeAspect = fromTheme("aspect");
	const themeEase = fromTheme("ease");
	const themeAnimate = fromTheme("animate");
	/**
	* Helpers to avoid repeating the same scales
	*
	* We use functions that create a new array every time they're called instead of static arrays.
	* This ensures that users who modify any scale by mutating the array (e.g. with `array.push(element)`) don't accidentally mutate arrays in other parts of the config.
	*/
	const scaleBreak = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	];
	const scalePosition = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	];
	const scalePositionWithArbitrary = () => [
		...scalePosition(),
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleOverflow = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	];
	const scaleOverscroll = () => [
		"auto",
		"contain",
		"none"
	];
	const scaleUnambiguousSpacing = () => [
		isArbitraryVariable,
		isArbitraryValue,
		themeSpacing
	];
	const scaleInset = () => [
		isFraction,
		"full",
		"auto",
		...scaleUnambiguousSpacing()
	];
	const scaleGridTemplateColsRows = () => [
		isInteger,
		"none",
		"subgrid",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartAndEnd = () => [
		"auto",
		{ span: [
			"full",
			isInteger,
			isArbitraryVariable,
			isArbitraryValue
		] },
		isInteger,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartOrEnd = () => [
		isInteger,
		"auto",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridAutoColsRows = () => [
		"auto",
		"min",
		"max",
		"fr",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleAlignPrimaryAxis = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	];
	const scaleAlignSecondaryAxis = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	];
	const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
	const scaleSizing = () => [
		isFraction,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleSizingInline = () => [
		themeContainer,
		isFraction,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleSizingBlock = () => [
		isFraction,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleColor = () => [
		themeColor,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBgPosition = () => [
		...scalePosition(),
		isArbitraryVariablePosition,
		isArbitraryPosition,
		{ position: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleBgRepeat = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }];
	const scaleBgSize = () => [
		"auto",
		"cover",
		"contain",
		isArbitraryVariableSize,
		isArbitrarySize,
		{ size: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleGradientStopPosition = () => [
		isPercent,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleRadius = () => [
		"",
		"none",
		"full",
		themeRadius,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBorderWidth = () => [
		"",
		isNumber,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleLineStyle = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	];
	const scaleBlendMode = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	];
	const scaleMaskImagePosition = () => [
		isNumber,
		isPercent,
		isArbitraryVariablePosition,
		isArbitraryPosition
	];
	const scaleBlur = () => [
		"",
		"none",
		themeBlur,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleRotate = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleScale = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleSkew = () => [
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleTranslate = () => [
		isFraction,
		"full",
		...scaleUnambiguousSpacing()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [isTshirtSize],
			breakpoint: [isTshirtSize],
			color: [isAny],
			container: [isTshirtSize],
			"drop-shadow": [isTshirtSize],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [isAnyNonArbitrary],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [isTshirtSize],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [isTshirtSize],
			shadow: [isTshirtSize],
			spacing: ["px", isNumber],
			text: [isTshirtSize],
			"text-shadow": [isTshirtSize],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			/**
			* Aspect Ratio
			* @see https://tailwindcss.com/docs/aspect-ratio
			*/
			aspect: [{ aspect: [
				"auto",
				"square",
				isFraction,
				isArbitraryValue,
				isArbitraryVariable,
				themeAspect
			] }],
			/**
			* Container
			* @see https://tailwindcss.com/docs/container
			* @deprecated since Tailwind CSS v4.0.0
			*/
			container: ["container"],
			/**
			* Container Type
			* @see https://tailwindcss.com/docs/responsive-design#container-queries
			*/
			"container-type": [{ "@container": [
				"",
				"normal",
				"size",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Container Name
			* @see https://tailwindcss.com/docs/responsive-design#named-containers
			*/
			"container-named": [isNamedContainerQuery],
			/**
			* Columns
			* @see https://tailwindcss.com/docs/columns
			*/
			columns: [{ columns: [
				isNumber,
				"auto",
				isArbitraryValue,
				isArbitraryVariable,
				themeContainer
			] }],
			/**
			* Break After
			* @see https://tailwindcss.com/docs/break-after
			*/
			"break-after": [{ "break-after": scaleBreak() }],
			/**
			* Break Before
			* @see https://tailwindcss.com/docs/break-before
			*/
			"break-before": [{ "break-before": scaleBreak() }],
			/**
			* Break Inside
			* @see https://tailwindcss.com/docs/break-inside
			*/
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			/**
			* Box Decoration Break
			* @see https://tailwindcss.com/docs/box-decoration-break
			*/
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			/**
			* Box Sizing
			* @see https://tailwindcss.com/docs/box-sizing
			*/
			box: [{ box: ["border", "content"] }],
			/**
			* Display
			* @see https://tailwindcss.com/docs/display
			*/
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			/**
			* Screen Reader Only
			* @see https://tailwindcss.com/docs/display#screen-reader-only
			*/
			sr: ["sr-only", "not-sr-only"],
			/**
			* Floats
			* @see https://tailwindcss.com/docs/float
			*/
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			/**
			* Clear
			* @see https://tailwindcss.com/docs/clear
			*/
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			/**
			* Isolation
			* @see https://tailwindcss.com/docs/isolation
			*/
			isolation: ["isolate", "isolation-auto"],
			/**
			* Object Fit
			* @see https://tailwindcss.com/docs/object-fit
			*/
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			/**
			* Object Position
			* @see https://tailwindcss.com/docs/object-position
			*/
			"object-position": [{ object: scalePositionWithArbitrary() }],
			/**
			* Overflow
			* @see https://tailwindcss.com/docs/overflow
			*/
			overflow: [{ overflow: scaleOverflow() }],
			/**
			* Overflow X
			* @see https://tailwindcss.com/docs/overflow
			*/
			"overflow-x": [{ "overflow-x": scaleOverflow() }],
			/**
			* Overflow Y
			* @see https://tailwindcss.com/docs/overflow
			*/
			"overflow-y": [{ "overflow-y": scaleOverflow() }],
			/**
			* Overscroll Behavior
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			overscroll: [{ overscroll: scaleOverscroll() }],
			/**
			* Overscroll Behavior X
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			"overscroll-x": [{ "overscroll-x": scaleOverscroll() }],
			/**
			* Overscroll Behavior Y
			* @see https://tailwindcss.com/docs/overscroll-behavior
			*/
			"overscroll-y": [{ "overscroll-y": scaleOverscroll() }],
			/**
			* Position
			* @see https://tailwindcss.com/docs/position
			*/
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			/**
			* Inset
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			inset: [{ inset: scaleInset() }],
			/**
			* Inset Inline
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-x": [{ "inset-x": scaleInset() }],
			/**
			* Inset Block
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-y": [{ "inset-y": scaleInset() }],
			/**
			* Inset Inline Start
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			* @todo class group will be renamed to `inset-s` in next major release
			*/
			start: [{
				"inset-s": scaleInset(),
				/**
				* @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
				* @see https://github.com/tailwindlabs/tailwindcss/pull/19613
				*/
				start: scaleInset()
			}],
			/**
			* Inset Inline End
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			* @todo class group will be renamed to `inset-e` in next major release
			*/
			end: [{
				"inset-e": scaleInset(),
				/**
				* @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
				* @see https://github.com/tailwindlabs/tailwindcss/pull/19613
				*/
				end: scaleInset()
			}],
			/**
			* Inset Block Start
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-bs": [{ "inset-bs": scaleInset() }],
			/**
			* Inset Block End
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			"inset-be": [{ "inset-be": scaleInset() }],
			/**
			* Top
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			top: [{ top: scaleInset() }],
			/**
			* Right
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			right: [{ right: scaleInset() }],
			/**
			* Bottom
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			bottom: [{ bottom: scaleInset() }],
			/**
			* Left
			* @see https://tailwindcss.com/docs/top-right-bottom-left
			*/
			left: [{ left: scaleInset() }],
			/**
			* Visibility
			* @see https://tailwindcss.com/docs/visibility
			*/
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			/**
			* Z-Index
			* @see https://tailwindcss.com/docs/z-index
			*/
			z: [{ z: [
				isInteger,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Flex Basis
			* @see https://tailwindcss.com/docs/flex-basis
			*/
			basis: [{ basis: [
				isFraction,
				"full",
				"auto",
				themeContainer,
				...scaleUnambiguousSpacing()
			] }],
			/**
			* Flex Direction
			* @see https://tailwindcss.com/docs/flex-direction
			*/
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			/**
			* Flex Wrap
			* @see https://tailwindcss.com/docs/flex-wrap
			*/
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			/**
			* Flex
			* @see https://tailwindcss.com/docs/flex
			*/
			flex: [{ flex: [
				isNumber,
				isFraction,
				"auto",
				"initial",
				"none",
				isArbitraryValue
			] }],
			/**
			* Flex Grow
			* @see https://tailwindcss.com/docs/flex-grow
			*/
			grow: [{ grow: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Flex Shrink
			* @see https://tailwindcss.com/docs/flex-shrink
			*/
			shrink: [{ shrink: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Order
			* @see https://tailwindcss.com/docs/order
			*/
			order: [{ order: [
				isInteger,
				"first",
				"last",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Grid Template Columns
			* @see https://tailwindcss.com/docs/grid-template-columns
			*/
			"grid-cols": [{ "grid-cols": scaleGridTemplateColsRows() }],
			/**
			* Grid Column Start / End
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-start-end": [{ col: scaleGridColRowStartAndEnd() }],
			/**
			* Grid Column Start
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-start": [{ "col-start": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Column End
			* @see https://tailwindcss.com/docs/grid-column
			*/
			"col-end": [{ "col-end": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Template Rows
			* @see https://tailwindcss.com/docs/grid-template-rows
			*/
			"grid-rows": [{ "grid-rows": scaleGridTemplateColsRows() }],
			/**
			* Grid Row Start / End
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-start-end": [{ row: scaleGridColRowStartAndEnd() }],
			/**
			* Grid Row Start
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-start": [{ "row-start": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Row End
			* @see https://tailwindcss.com/docs/grid-row
			*/
			"row-end": [{ "row-end": scaleGridColRowStartOrEnd() }],
			/**
			* Grid Auto Flow
			* @see https://tailwindcss.com/docs/grid-auto-flow
			*/
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			/**
			* Grid Auto Columns
			* @see https://tailwindcss.com/docs/grid-auto-columns
			*/
			"auto-cols": [{ "auto-cols": scaleGridAutoColsRows() }],
			/**
			* Grid Auto Rows
			* @see https://tailwindcss.com/docs/grid-auto-rows
			*/
			"auto-rows": [{ "auto-rows": scaleGridAutoColsRows() }],
			/**
			* Gap
			* @see https://tailwindcss.com/docs/gap
			*/
			gap: [{ gap: scaleUnambiguousSpacing() }],
			/**
			* Gap X
			* @see https://tailwindcss.com/docs/gap
			*/
			"gap-x": [{ "gap-x": scaleUnambiguousSpacing() }],
			/**
			* Gap Y
			* @see https://tailwindcss.com/docs/gap
			*/
			"gap-y": [{ "gap-y": scaleUnambiguousSpacing() }],
			/**
			* Justify Content
			* @see https://tailwindcss.com/docs/justify-content
			*/
			"justify-content": [{ justify: [...scaleAlignPrimaryAxis(), "normal"] }],
			/**
			* Justify Items
			* @see https://tailwindcss.com/docs/justify-items
			*/
			"justify-items": [{ "justify-items": [...scaleAlignSecondaryAxis(), "normal"] }],
			/**
			* Justify Self
			* @see https://tailwindcss.com/docs/justify-self
			*/
			"justify-self": [{ "justify-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			/**
			* Align Content
			* @see https://tailwindcss.com/docs/align-content
			*/
			"align-content": [{ content: ["normal", ...scaleAlignPrimaryAxis()] }],
			/**
			* Align Items
			* @see https://tailwindcss.com/docs/align-items
			*/
			"align-items": [{ items: [...scaleAlignSecondaryAxis(), { baseline: ["", "last"] }] }],
			/**
			* Align Self
			* @see https://tailwindcss.com/docs/align-self
			*/
			"align-self": [{ self: [
				"auto",
				...scaleAlignSecondaryAxis(),
				{ baseline: ["", "last"] }
			] }],
			/**
			* Place Content
			* @see https://tailwindcss.com/docs/place-content
			*/
			"place-content": [{ "place-content": scaleAlignPrimaryAxis() }],
			/**
			* Place Items
			* @see https://tailwindcss.com/docs/place-items
			*/
			"place-items": [{ "place-items": [...scaleAlignSecondaryAxis(), "baseline"] }],
			/**
			* Place Self
			* @see https://tailwindcss.com/docs/place-self
			*/
			"place-self": [{ "place-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			/**
			* Padding
			* @see https://tailwindcss.com/docs/padding
			*/
			p: [{ p: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline
			* @see https://tailwindcss.com/docs/padding
			*/
			px: [{ px: scaleUnambiguousSpacing() }],
			/**
			* Padding Block
			* @see https://tailwindcss.com/docs/padding
			*/
			py: [{ py: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline Start
			* @see https://tailwindcss.com/docs/padding
			*/
			ps: [{ ps: scaleUnambiguousSpacing() }],
			/**
			* Padding Inline End
			* @see https://tailwindcss.com/docs/padding
			*/
			pe: [{ pe: scaleUnambiguousSpacing() }],
			/**
			* Padding Block Start
			* @see https://tailwindcss.com/docs/padding
			*/
			pbs: [{ pbs: scaleUnambiguousSpacing() }],
			/**
			* Padding Block End
			* @see https://tailwindcss.com/docs/padding
			*/
			pbe: [{ pbe: scaleUnambiguousSpacing() }],
			/**
			* Padding Top
			* @see https://tailwindcss.com/docs/padding
			*/
			pt: [{ pt: scaleUnambiguousSpacing() }],
			/**
			* Padding Right
			* @see https://tailwindcss.com/docs/padding
			*/
			pr: [{ pr: scaleUnambiguousSpacing() }],
			/**
			* Padding Bottom
			* @see https://tailwindcss.com/docs/padding
			*/
			pb: [{ pb: scaleUnambiguousSpacing() }],
			/**
			* Padding Left
			* @see https://tailwindcss.com/docs/padding
			*/
			pl: [{ pl: scaleUnambiguousSpacing() }],
			/**
			* Margin
			* @see https://tailwindcss.com/docs/margin
			*/
			m: [{ m: scaleMargin() }],
			/**
			* Margin Inline
			* @see https://tailwindcss.com/docs/margin
			*/
			mx: [{ mx: scaleMargin() }],
			/**
			* Margin Block
			* @see https://tailwindcss.com/docs/margin
			*/
			my: [{ my: scaleMargin() }],
			/**
			* Margin Inline Start
			* @see https://tailwindcss.com/docs/margin
			*/
			ms: [{ ms: scaleMargin() }],
			/**
			* Margin Inline End
			* @see https://tailwindcss.com/docs/margin
			*/
			me: [{ me: scaleMargin() }],
			/**
			* Margin Block Start
			* @see https://tailwindcss.com/docs/margin
			*/
			mbs: [{ mbs: scaleMargin() }],
			/**
			* Margin Block End
			* @see https://tailwindcss.com/docs/margin
			*/
			mbe: [{ mbe: scaleMargin() }],
			/**
			* Margin Top
			* @see https://tailwindcss.com/docs/margin
			*/
			mt: [{ mt: scaleMargin() }],
			/**
			* Margin Right
			* @see https://tailwindcss.com/docs/margin
			*/
			mr: [{ mr: scaleMargin() }],
			/**
			* Margin Bottom
			* @see https://tailwindcss.com/docs/margin
			*/
			mb: [{ mb: scaleMargin() }],
			/**
			* Margin Left
			* @see https://tailwindcss.com/docs/margin
			*/
			ml: [{ ml: scaleMargin() }],
			/**
			* Space Between X
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-x": [{ "space-x": scaleUnambiguousSpacing() }],
			/**
			* Space Between X Reverse
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-x-reverse": ["space-x-reverse"],
			/**
			* Space Between Y
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-y": [{ "space-y": scaleUnambiguousSpacing() }],
			/**
			* Space Between Y Reverse
			* @see https://tailwindcss.com/docs/margin#adding-space-between-children
			*/
			"space-y-reverse": ["space-y-reverse"],
			/**
			* Size
			* @see https://tailwindcss.com/docs/width#setting-both-width-and-height
			*/
			size: [{ size: scaleSizing() }],
			/**
			* Inline Size
			* @see https://tailwindcss.com/docs/inline-size
			*/
			"inline-size": [{ inline: ["auto", ...scaleSizingInline()] }],
			/**
			* Min-Inline Size
			* @see https://tailwindcss.com/docs/min-inline-size
			*/
			"min-inline-size": [{ "min-inline": ["auto", ...scaleSizingInline()] }],
			/**
			* Max-Inline Size
			* @see https://tailwindcss.com/docs/max-inline-size
			*/
			"max-inline-size": [{ "max-inline": ["none", ...scaleSizingInline()] }],
			/**
			* Block Size
			* @see https://tailwindcss.com/docs/block-size
			*/
			"block-size": [{ block: ["auto", ...scaleSizingBlock()] }],
			/**
			* Min-Block Size
			* @see https://tailwindcss.com/docs/min-block-size
			*/
			"min-block-size": [{ "min-block": ["auto", ...scaleSizingBlock()] }],
			/**
			* Max-Block Size
			* @see https://tailwindcss.com/docs/max-block-size
			*/
			"max-block-size": [{ "max-block": ["none", ...scaleSizingBlock()] }],
			/**
			* Width
			* @see https://tailwindcss.com/docs/width
			*/
			w: [{ w: [
				themeContainer,
				"screen",
				...scaleSizing()
			] }],
			/**
			* Min-Width
			* @see https://tailwindcss.com/docs/min-width
			*/
			"min-w": [{ "min-w": [
				themeContainer,
				"screen",
				"none",
				...scaleSizing()
			] }],
			/**
			* Max-Width
			* @see https://tailwindcss.com/docs/max-width
			*/
			"max-w": [{ "max-w": [
				themeContainer,
				"screen",
				"none",
				"prose",
				{ screen: [themeBreakpoint] },
				...scaleSizing()
			] }],
			/**
			* Height
			* @see https://tailwindcss.com/docs/height
			*/
			h: [{ h: [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			/**
			* Min-Height
			* @see https://tailwindcss.com/docs/min-height
			*/
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...scaleSizing()
			] }],
			/**
			* Max-Height
			* @see https://tailwindcss.com/docs/max-height
			*/
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				"none",
				...scaleSizing()
			] }],
			/**
			* Font Size
			* @see https://tailwindcss.com/docs/font-size
			*/
			"font-size": [{ text: [
				"base",
				themeText,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			/**
			* Font Smoothing
			* @see https://tailwindcss.com/docs/font-smoothing
			*/
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			/**
			* Font Style
			* @see https://tailwindcss.com/docs/font-style
			*/
			"font-style": ["italic", "not-italic"],
			/**
			* Font Weight
			* @see https://tailwindcss.com/docs/font-weight
			*/
			"font-weight": [{ font: [
				themeFontWeight,
				isArbitraryVariableWeight,
				isArbitraryWeight
			] }],
			/**
			* Font Stretch
			* @see https://tailwindcss.com/docs/font-stretch
			*/
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				isPercent,
				isArbitraryValue
			] }],
			/**
			* Font Family
			* @see https://tailwindcss.com/docs/font-family
			*/
			"font-family": [{ font: [
				isArbitraryVariableFamilyName,
				isArbitraryFamilyName,
				themeFont
			] }],
			/**
			* Font Feature Settings
			* @see https://tailwindcss.com/docs/font-feature-settings
			*/
			"font-features": [{ "font-features": [isArbitraryValue] }],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-normal": ["normal-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-ordinal": ["ordinal"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-slashed-zero": ["slashed-zero"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			/**
			* Font Variant Numeric
			* @see https://tailwindcss.com/docs/font-variant-numeric
			*/
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			/**
			* Letter Spacing
			* @see https://tailwindcss.com/docs/letter-spacing
			*/
			tracking: [{ tracking: [
				themeTracking,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Line Clamp
			* @see https://tailwindcss.com/docs/line-clamp
			*/
			"line-clamp": [{ "line-clamp": [
				isNumber,
				"none",
				isArbitraryVariable,
				isArbitraryNumber
			] }],
			/**
			* Line Height
			* @see https://tailwindcss.com/docs/line-height
			*/
			leading: [{ leading: [
				"none",
				themeLeading,
				...scaleUnambiguousSpacing()
			] }],
			/**
			* List Style Image
			* @see https://tailwindcss.com/docs/list-style-image
			*/
			"list-image": [{ "list-image": [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* List Style Position
			* @see https://tailwindcss.com/docs/list-style-position
			*/
			"list-style-position": [{ list: ["inside", "outside"] }],
			/**
			* List Style Type
			* @see https://tailwindcss.com/docs/list-style-type
			*/
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Text Alignment
			* @see https://tailwindcss.com/docs/text-align
			*/
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			/**
			* Placeholder Color
			* @deprecated since Tailwind CSS v3.0.0
			* @see https://v3.tailwindcss.com/docs/placeholder-color
			*/
			"placeholder-color": [{ placeholder: scaleColor() }],
			/**
			* Text Color
			* @see https://tailwindcss.com/docs/text-color
			*/
			"text-color": [{ text: scaleColor() }],
			/**
			* Text Decoration
			* @see https://tailwindcss.com/docs/text-decoration
			*/
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			/**
			* Text Decoration Style
			* @see https://tailwindcss.com/docs/text-decoration-style
			*/
			"text-decoration-style": [{ decoration: [...scaleLineStyle(), "wavy"] }],
			/**
			* Text Decoration Thickness
			* @see https://tailwindcss.com/docs/text-decoration-thickness
			*/
			"text-decoration-thickness": [{ decoration: [
				isNumber,
				"from-font",
				"auto",
				isArbitraryVariable,
				isArbitraryLength
			] }],
			/**
			* Text Decoration Color
			* @see https://tailwindcss.com/docs/text-decoration-color
			*/
			"text-decoration-color": [{ decoration: scaleColor() }],
			/**
			* Text Underline Offset
			* @see https://tailwindcss.com/docs/text-underline-offset
			*/
			"underline-offset": [{ "underline-offset": [
				isNumber,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Text Transform
			* @see https://tailwindcss.com/docs/text-transform
			*/
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			/**
			* Text Overflow
			* @see https://tailwindcss.com/docs/text-overflow
			*/
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			/**
			* Text Wrap
			* @see https://tailwindcss.com/docs/text-wrap
			*/
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			/**
			* Text Indent
			* @see https://tailwindcss.com/docs/text-indent
			*/
			indent: [{ indent: scaleUnambiguousSpacing() }],
			/**
			* Tab Size
			* @see https://tailwindcss.com/docs/tab-size
			*/
			"tab-size": [{ tab: [
				isInteger,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Vertical Alignment
			* @see https://tailwindcss.com/docs/vertical-align
			*/
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Whitespace
			* @see https://tailwindcss.com/docs/whitespace
			*/
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			/**
			* Word Break
			* @see https://tailwindcss.com/docs/word-break
			*/
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			/**
			* Overflow Wrap
			* @see https://tailwindcss.com/docs/overflow-wrap
			*/
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			/**
			* Hyphens
			* @see https://tailwindcss.com/docs/hyphens
			*/
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			/**
			* Content
			* @see https://tailwindcss.com/docs/content
			*/
			content: [{ content: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Background Attachment
			* @see https://tailwindcss.com/docs/background-attachment
			*/
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			/**
			* Background Clip
			* @see https://tailwindcss.com/docs/background-clip
			*/
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			/**
			* Background Origin
			* @see https://tailwindcss.com/docs/background-origin
			*/
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			/**
			* Background Position
			* @see https://tailwindcss.com/docs/background-position
			*/
			"bg-position": [{ bg: scaleBgPosition() }],
			/**
			* Background Repeat
			* @see https://tailwindcss.com/docs/background-repeat
			*/
			"bg-repeat": [{ bg: scaleBgRepeat() }],
			/**
			* Background Size
			* @see https://tailwindcss.com/docs/background-size
			*/
			"bg-size": [{ bg: scaleBgSize() }],
			/**
			* Background Image
			* @see https://tailwindcss.com/docs/background-image
			*/
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					],
					radial: [
						"",
						isArbitraryVariable,
						isArbitraryValue
					],
					conic: [
						"",
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					]
				},
				isArbitraryVariableImage,
				isArbitraryImage
			] }],
			/**
			* Background Color
			* @see https://tailwindcss.com/docs/background-color
			*/
			"bg-color": [{ bg: scaleColor() }],
			/**
			* Gradient Color Stops From Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-from-pos": [{ from: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops Via Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-via-pos": [{ via: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops To Position
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-to-pos": [{ to: scaleGradientStopPosition() }],
			/**
			* Gradient Color Stops From
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-from": [{ from: scaleColor() }],
			/**
			* Gradient Color Stops Via
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-via": [{ via: scaleColor() }],
			/**
			* Gradient Color Stops To
			* @see https://tailwindcss.com/docs/gradient-color-stops
			*/
			"gradient-to": [{ to: scaleColor() }],
			/**
			* Border Radius
			* @see https://tailwindcss.com/docs/border-radius
			*/
			rounded: [{ rounded: scaleRadius() }],
			/**
			* Border Radius Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-s": [{ "rounded-s": scaleRadius() }],
			/**
			* Border Radius End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-e": [{ "rounded-e": scaleRadius() }],
			/**
			* Border Radius Top
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-t": [{ "rounded-t": scaleRadius() }],
			/**
			* Border Radius Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-r": [{ "rounded-r": scaleRadius() }],
			/**
			* Border Radius Bottom
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-b": [{ "rounded-b": scaleRadius() }],
			/**
			* Border Radius Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-l": [{ "rounded-l": scaleRadius() }],
			/**
			* Border Radius Start Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-ss": [{ "rounded-ss": scaleRadius() }],
			/**
			* Border Radius Start End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-se": [{ "rounded-se": scaleRadius() }],
			/**
			* Border Radius End End
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-ee": [{ "rounded-ee": scaleRadius() }],
			/**
			* Border Radius End Start
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-es": [{ "rounded-es": scaleRadius() }],
			/**
			* Border Radius Top Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-tl": [{ "rounded-tl": scaleRadius() }],
			/**
			* Border Radius Top Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-tr": [{ "rounded-tr": scaleRadius() }],
			/**
			* Border Radius Bottom Right
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-br": [{ "rounded-br": scaleRadius() }],
			/**
			* Border Radius Bottom Left
			* @see https://tailwindcss.com/docs/border-radius
			*/
			"rounded-bl": [{ "rounded-bl": scaleRadius() }],
			/**
			* Border Width
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w": [{ border: scaleBorderWidth() }],
			/**
			* Border Width Inline
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-x": [{ "border-x": scaleBorderWidth() }],
			/**
			* Border Width Block
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-y": [{ "border-y": scaleBorderWidth() }],
			/**
			* Border Width Inline Start
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-s": [{ "border-s": scaleBorderWidth() }],
			/**
			* Border Width Inline End
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-e": [{ "border-e": scaleBorderWidth() }],
			/**
			* Border Width Block Start
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-bs": [{ "border-bs": scaleBorderWidth() }],
			/**
			* Border Width Block End
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-be": [{ "border-be": scaleBorderWidth() }],
			/**
			* Border Width Top
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-t": [{ "border-t": scaleBorderWidth() }],
			/**
			* Border Width Right
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-r": [{ "border-r": scaleBorderWidth() }],
			/**
			* Border Width Bottom
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-b": [{ "border-b": scaleBorderWidth() }],
			/**
			* Border Width Left
			* @see https://tailwindcss.com/docs/border-width
			*/
			"border-w-l": [{ "border-l": scaleBorderWidth() }],
			/**
			* Divide Width X
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-x": [{ "divide-x": scaleBorderWidth() }],
			/**
			* Divide Width X Reverse
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-x-reverse": ["divide-x-reverse"],
			/**
			* Divide Width Y
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-y": [{ "divide-y": scaleBorderWidth() }],
			/**
			* Divide Width Y Reverse
			* @see https://tailwindcss.com/docs/border-width#between-children
			*/
			"divide-y-reverse": ["divide-y-reverse"],
			/**
			* Border Style
			* @see https://tailwindcss.com/docs/border-style
			*/
			"border-style": [{ border: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			/**
			* Divide Style
			* @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
			*/
			"divide-style": [{ divide: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			/**
			* Border Color
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color": [{ border: scaleColor() }],
			/**
			* Border Color Inline
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-x": [{ "border-x": scaleColor() }],
			/**
			* Border Color Block
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-y": [{ "border-y": scaleColor() }],
			/**
			* Border Color Inline Start
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-s": [{ "border-s": scaleColor() }],
			/**
			* Border Color Inline End
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-e": [{ "border-e": scaleColor() }],
			/**
			* Border Color Block Start
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-bs": [{ "border-bs": scaleColor() }],
			/**
			* Border Color Block End
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-be": [{ "border-be": scaleColor() }],
			/**
			* Border Color Top
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-t": [{ "border-t": scaleColor() }],
			/**
			* Border Color Right
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-r": [{ "border-r": scaleColor() }],
			/**
			* Border Color Bottom
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-b": [{ "border-b": scaleColor() }],
			/**
			* Border Color Left
			* @see https://tailwindcss.com/docs/border-color
			*/
			"border-color-l": [{ "border-l": scaleColor() }],
			/**
			* Divide Color
			* @see https://tailwindcss.com/docs/divide-color
			*/
			"divide-color": [{ divide: scaleColor() }],
			/**
			* Outline Style
			* @see https://tailwindcss.com/docs/outline-style
			*/
			"outline-style": [{ outline: [
				...scaleLineStyle(),
				"none",
				"hidden"
			] }],
			/**
			* Outline Offset
			* @see https://tailwindcss.com/docs/outline-offset
			*/
			"outline-offset": [{ "outline-offset": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Outline Width
			* @see https://tailwindcss.com/docs/outline-width
			*/
			"outline-w": [{ outline: [
				"",
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			/**
			* Outline Color
			* @see https://tailwindcss.com/docs/outline-color
			*/
			"outline-color": [{ outline: scaleColor() }],
			/**
			* Box Shadow
			* @see https://tailwindcss.com/docs/box-shadow
			*/
			shadow: [{ shadow: [
				"",
				"inner",
				"none",
				themeShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Box Shadow Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
			*/
			"shadow-color": [{ shadow: scaleColor() }],
			/**
			* Inset Box Shadow
			* @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
			*/
			"inset-shadow": [{ "inset-shadow": [
				"none",
				themeInsetShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Inset Box Shadow Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
			*/
			"inset-shadow-color": [{ "inset-shadow": scaleColor() }],
			/**
			* Ring Width
			* @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
			*/
			"ring-w": [{ ring: scaleBorderWidth() }],
			/**
			* Ring Width Inset
			* @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-w-inset": ["ring-inset"],
			/**
			* Ring Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
			*/
			"ring-color": [{ ring: scaleColor() }],
			/**
			* Ring Offset Width
			* @see https://v3.tailwindcss.com/docs/ring-offset-width
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-offset-w": [{ "ring-offset": [isNumber, isArbitraryLength] }],
			/**
			* Ring Offset Color
			* @see https://v3.tailwindcss.com/docs/ring-offset-color
			* @deprecated since Tailwind CSS v4.0.0
			* @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
			*/
			"ring-offset-color": [{ "ring-offset": scaleColor() }],
			/**
			* Inset Ring Width
			* @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
			*/
			"inset-ring-w": [{ "inset-ring": scaleBorderWidth() }],
			/**
			* Inset Ring Color
			* @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
			*/
			"inset-ring-color": [{ "inset-ring": scaleColor() }],
			/**
			* Text Shadow
			* @see https://tailwindcss.com/docs/text-shadow
			*/
			"text-shadow": [{ "text-shadow": [
				"none",
				themeTextShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Text Shadow Color
			* @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
			*/
			"text-shadow-color": [{ "text-shadow": scaleColor() }],
			/**
			* Opacity
			* @see https://tailwindcss.com/docs/opacity
			*/
			opacity: [{ opacity: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Mix Blend Mode
			* @see https://tailwindcss.com/docs/mix-blend-mode
			*/
			"mix-blend": [{ "mix-blend": [
				...scaleBlendMode(),
				"plus-darker",
				"plus-lighter"
			] }],
			/**
			* Background Blend Mode
			* @see https://tailwindcss.com/docs/background-blend-mode
			*/
			"bg-blend": [{ "bg-blend": scaleBlendMode() }],
			/**
			* Mask Clip
			* @see https://tailwindcss.com/docs/mask-clip
			*/
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			/**
			* Mask Composite
			* @see https://tailwindcss.com/docs/mask-composite
			*/
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			/**
			* Mask Image
			* @see https://tailwindcss.com/docs/mask-image
			*/
			"mask-image-linear-pos": [{ "mask-linear": [isNumber] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": scaleMaskImagePosition() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": scaleMaskImagePosition() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": scaleColor() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": scaleColor() }],
			"mask-image-t-from-pos": [{ "mask-t-from": scaleMaskImagePosition() }],
			"mask-image-t-to-pos": [{ "mask-t-to": scaleMaskImagePosition() }],
			"mask-image-t-from-color": [{ "mask-t-from": scaleColor() }],
			"mask-image-t-to-color": [{ "mask-t-to": scaleColor() }],
			"mask-image-r-from-pos": [{ "mask-r-from": scaleMaskImagePosition() }],
			"mask-image-r-to-pos": [{ "mask-r-to": scaleMaskImagePosition() }],
			"mask-image-r-from-color": [{ "mask-r-from": scaleColor() }],
			"mask-image-r-to-color": [{ "mask-r-to": scaleColor() }],
			"mask-image-b-from-pos": [{ "mask-b-from": scaleMaskImagePosition() }],
			"mask-image-b-to-pos": [{ "mask-b-to": scaleMaskImagePosition() }],
			"mask-image-b-from-color": [{ "mask-b-from": scaleColor() }],
			"mask-image-b-to-color": [{ "mask-b-to": scaleColor() }],
			"mask-image-l-from-pos": [{ "mask-l-from": scaleMaskImagePosition() }],
			"mask-image-l-to-pos": [{ "mask-l-to": scaleMaskImagePosition() }],
			"mask-image-l-from-color": [{ "mask-l-from": scaleColor() }],
			"mask-image-l-to-color": [{ "mask-l-to": scaleColor() }],
			"mask-image-x-from-pos": [{ "mask-x-from": scaleMaskImagePosition() }],
			"mask-image-x-to-pos": [{ "mask-x-to": scaleMaskImagePosition() }],
			"mask-image-x-from-color": [{ "mask-x-from": scaleColor() }],
			"mask-image-x-to-color": [{ "mask-x-to": scaleColor() }],
			"mask-image-y-from-pos": [{ "mask-y-from": scaleMaskImagePosition() }],
			"mask-image-y-to-pos": [{ "mask-y-to": scaleMaskImagePosition() }],
			"mask-image-y-from-color": [{ "mask-y-from": scaleColor() }],
			"mask-image-y-to-color": [{ "mask-y-to": scaleColor() }],
			"mask-image-radial": [{ "mask-radial": [isArbitraryVariable, isArbitraryValue] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": scaleMaskImagePosition() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": scaleMaskImagePosition() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": scaleColor() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": scaleColor() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": scalePosition() }],
			"mask-image-conic-pos": [{ "mask-conic": [isNumber] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": scaleMaskImagePosition() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": scaleMaskImagePosition() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": scaleColor() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": scaleColor() }],
			/**
			* Mask Mode
			* @see https://tailwindcss.com/docs/mask-mode
			*/
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			/**
			* Mask Origin
			* @see https://tailwindcss.com/docs/mask-origin
			*/
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			/**
			* Mask Position
			* @see https://tailwindcss.com/docs/mask-position
			*/
			"mask-position": [{ mask: scaleBgPosition() }],
			/**
			* Mask Repeat
			* @see https://tailwindcss.com/docs/mask-repeat
			*/
			"mask-repeat": [{ mask: scaleBgRepeat() }],
			/**
			* Mask Size
			* @see https://tailwindcss.com/docs/mask-size
			*/
			"mask-size": [{ mask: scaleBgSize() }],
			/**
			* Mask Type
			* @see https://tailwindcss.com/docs/mask-type
			*/
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			/**
			* Mask Image
			* @see https://tailwindcss.com/docs/mask-image
			*/
			"mask-image": [{ mask: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Filter
			* @see https://tailwindcss.com/docs/filter
			*/
			filter: [{ filter: [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Blur
			* @see https://tailwindcss.com/docs/blur
			*/
			blur: [{ blur: scaleBlur() }],
			/**
			* Brightness
			* @see https://tailwindcss.com/docs/brightness
			*/
			brightness: [{ brightness: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Contrast
			* @see https://tailwindcss.com/docs/contrast
			*/
			contrast: [{ contrast: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Drop Shadow
			* @see https://tailwindcss.com/docs/drop-shadow
			*/
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				themeDropShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			/**
			* Drop Shadow Color
			* @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
			*/
			"drop-shadow-color": [{ "drop-shadow": scaleColor() }],
			/**
			* Grayscale
			* @see https://tailwindcss.com/docs/grayscale
			*/
			grayscale: [{ grayscale: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Hue Rotate
			* @see https://tailwindcss.com/docs/hue-rotate
			*/
			"hue-rotate": [{ "hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Invert
			* @see https://tailwindcss.com/docs/invert
			*/
			invert: [{ invert: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Saturate
			* @see https://tailwindcss.com/docs/saturate
			*/
			saturate: [{ saturate: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Sepia
			* @see https://tailwindcss.com/docs/sepia
			*/
			sepia: [{ sepia: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Filter
			* @see https://tailwindcss.com/docs/backdrop-filter
			*/
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Blur
			* @see https://tailwindcss.com/docs/backdrop-blur
			*/
			"backdrop-blur": [{ "backdrop-blur": scaleBlur() }],
			/**
			* Backdrop Brightness
			* @see https://tailwindcss.com/docs/backdrop-brightness
			*/
			"backdrop-brightness": [{ "backdrop-brightness": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Contrast
			* @see https://tailwindcss.com/docs/backdrop-contrast
			*/
			"backdrop-contrast": [{ "backdrop-contrast": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Grayscale
			* @see https://tailwindcss.com/docs/backdrop-grayscale
			*/
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Hue Rotate
			* @see https://tailwindcss.com/docs/backdrop-hue-rotate
			*/
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Invert
			* @see https://tailwindcss.com/docs/backdrop-invert
			*/
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Opacity
			* @see https://tailwindcss.com/docs/backdrop-opacity
			*/
			"backdrop-opacity": [{ "backdrop-opacity": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Saturate
			* @see https://tailwindcss.com/docs/backdrop-saturate
			*/
			"backdrop-saturate": [{ "backdrop-saturate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backdrop Sepia
			* @see https://tailwindcss.com/docs/backdrop-sepia
			*/
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Border Collapse
			* @see https://tailwindcss.com/docs/border-collapse
			*/
			"border-collapse": [{ border: ["collapse", "separate"] }],
			/**
			* Border Spacing
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing": [{ "border-spacing": scaleUnambiguousSpacing() }],
			/**
			* Border Spacing X
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing-x": [{ "border-spacing-x": scaleUnambiguousSpacing() }],
			/**
			* Border Spacing Y
			* @see https://tailwindcss.com/docs/border-spacing
			*/
			"border-spacing-y": [{ "border-spacing-y": scaleUnambiguousSpacing() }],
			/**
			* Table Layout
			* @see https://tailwindcss.com/docs/table-layout
			*/
			"table-layout": [{ table: ["auto", "fixed"] }],
			/**
			* Caption Side
			* @see https://tailwindcss.com/docs/caption-side
			*/
			caption: [{ caption: ["top", "bottom"] }],
			/**
			* Transition Property
			* @see https://tailwindcss.com/docs/transition-property
			*/
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Behavior
			* @see https://tailwindcss.com/docs/transition-behavior
			*/
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			/**
			* Transition Duration
			* @see https://tailwindcss.com/docs/transition-duration
			*/
			duration: [{ duration: [
				isNumber,
				"initial",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Timing Function
			* @see https://tailwindcss.com/docs/transition-timing-function
			*/
			ease: [{ ease: [
				"linear",
				"initial",
				themeEase,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Transition Delay
			* @see https://tailwindcss.com/docs/transition-delay
			*/
			delay: [{ delay: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Animation
			* @see https://tailwindcss.com/docs/animation
			*/
			animate: [{ animate: [
				"none",
				themeAnimate,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Backface Visibility
			* @see https://tailwindcss.com/docs/backface-visibility
			*/
			backface: [{ backface: ["hidden", "visible"] }],
			/**
			* Perspective
			* @see https://tailwindcss.com/docs/perspective
			*/
			perspective: [{ perspective: [
				themePerspective,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Perspective Origin
			* @see https://tailwindcss.com/docs/perspective-origin
			*/
			"perspective-origin": [{ "perspective-origin": scalePositionWithArbitrary() }],
			/**
			* Rotate
			* @see https://tailwindcss.com/docs/rotate
			*/
			rotate: [{ rotate: scaleRotate() }],
			/**
			* Rotate X
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-x": [{ "rotate-x": scaleRotate() }],
			/**
			* Rotate Y
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-y": [{ "rotate-y": scaleRotate() }],
			/**
			* Rotate Z
			* @see https://tailwindcss.com/docs/rotate
			*/
			"rotate-z": [{ "rotate-z": scaleRotate() }],
			/**
			* Scale
			* @see https://tailwindcss.com/docs/scale
			*/
			scale: [{ scale: scaleScale() }],
			/**
			* Scale X
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-x": [{ "scale-x": scaleScale() }],
			/**
			* Scale Y
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-y": [{ "scale-y": scaleScale() }],
			/**
			* Scale Z
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-z": [{ "scale-z": scaleScale() }],
			/**
			* Scale 3D
			* @see https://tailwindcss.com/docs/scale
			*/
			"scale-3d": ["scale-3d"],
			/**
			* Skew
			* @see https://tailwindcss.com/docs/skew
			*/
			skew: [{ skew: scaleSkew() }],
			/**
			* Skew X
			* @see https://tailwindcss.com/docs/skew
			*/
			"skew-x": [{ "skew-x": scaleSkew() }],
			/**
			* Skew Y
			* @see https://tailwindcss.com/docs/skew
			*/
			"skew-y": [{ "skew-y": scaleSkew() }],
			/**
			* Transform
			* @see https://tailwindcss.com/docs/transform
			*/
			transform: [{ transform: [
				isArbitraryVariable,
				isArbitraryValue,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			/**
			* Transform Origin
			* @see https://tailwindcss.com/docs/transform-origin
			*/
			"transform-origin": [{ origin: scalePositionWithArbitrary() }],
			/**
			* Transform Style
			* @see https://tailwindcss.com/docs/transform-style
			*/
			"transform-style": [{ transform: ["3d", "flat"] }],
			/**
			* Translate
			* @see https://tailwindcss.com/docs/translate
			*/
			translate: [{ translate: scaleTranslate() }],
			/**
			* Translate X
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-x": [{ "translate-x": scaleTranslate() }],
			/**
			* Translate Y
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-y": [{ "translate-y": scaleTranslate() }],
			/**
			* Translate Z
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-z": [{ "translate-z": scaleTranslate() }],
			/**
			* Translate None
			* @see https://tailwindcss.com/docs/translate
			*/
			"translate-none": ["translate-none"],
			/**
			* Zoom
			* @see https://tailwindcss.com/docs/zoom
			*/
			zoom: [{ zoom: [
				isInteger,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Accent Color
			* @see https://tailwindcss.com/docs/accent-color
			*/
			accent: [{ accent: scaleColor() }],
			/**
			* Appearance
			* @see https://tailwindcss.com/docs/appearance
			*/
			appearance: [{ appearance: ["none", "auto"] }],
			/**
			* Caret Color
			* @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
			*/
			"caret-color": [{ caret: scaleColor() }],
			/**
			* Color Scheme
			* @see https://tailwindcss.com/docs/color-scheme
			*/
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			/**
			* Cursor
			* @see https://tailwindcss.com/docs/cursor
			*/
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Field Sizing
			* @see https://tailwindcss.com/docs/field-sizing
			*/
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			/**
			* Pointer Events
			* @see https://tailwindcss.com/docs/pointer-events
			*/
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			/**
			* Resize
			* @see https://tailwindcss.com/docs/resize
			*/
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			/**
			* Scroll Behavior
			* @see https://tailwindcss.com/docs/scroll-behavior
			*/
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			/**
			* Scrollbar Thumb Color
			* @see https://tailwindcss.com/docs/scrollbar-color
			*/
			"scrollbar-thumb-color": [{ "scrollbar-thumb": scaleColor() }],
			/**
			* Scrollbar Track Color
			* @see https://tailwindcss.com/docs/scrollbar-color
			*/
			"scrollbar-track-color": [{ "scrollbar-track": scaleColor() }],
			/**
			* Scrollbar Gutter
			* @see https://tailwindcss.com/docs/scrollbar-gutter
			*/
			"scrollbar-gutter": [{ "scrollbar-gutter": [
				"auto",
				"stable",
				"both"
			] }],
			/**
			* Scrollbar Width
			* @see https://tailwindcss.com/docs/scrollbar-width
			*/
			"scrollbar-w": [{ scrollbar: [
				"auto",
				"thin",
				"none"
			] }],
			/**
			* Scroll Margin
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-m": [{ "scroll-m": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mx": [{ "scroll-mx": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-my": [{ "scroll-my": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline Start
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-ms": [{ "scroll-ms": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Inline End
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-me": [{ "scroll-me": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block Start
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mbs": [{ "scroll-mbs": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Block End
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mbe": [{ "scroll-mbe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Top
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mt": [{ "scroll-mt": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Right
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mr": [{ "scroll-mr": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Bottom
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-mb": [{ "scroll-mb": scaleUnambiguousSpacing() }],
			/**
			* Scroll Margin Left
			* @see https://tailwindcss.com/docs/scroll-margin
			*/
			"scroll-ml": [{ "scroll-ml": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-p": [{ "scroll-p": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-px": [{ "scroll-px": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-py": [{ "scroll-py": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline Start
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-ps": [{ "scroll-ps": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Inline End
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pe": [{ "scroll-pe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block Start
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pbs": [{ "scroll-pbs": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Block End
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pbe": [{ "scroll-pbe": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Top
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pt": [{ "scroll-pt": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Right
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pr": [{ "scroll-pr": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Bottom
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pb": [{ "scroll-pb": scaleUnambiguousSpacing() }],
			/**
			* Scroll Padding Left
			* @see https://tailwindcss.com/docs/scroll-padding
			*/
			"scroll-pl": [{ "scroll-pl": scaleUnambiguousSpacing() }],
			/**
			* Scroll Snap Align
			* @see https://tailwindcss.com/docs/scroll-snap-align
			*/
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			/**
			* Scroll Snap Stop
			* @see https://tailwindcss.com/docs/scroll-snap-stop
			*/
			"snap-stop": [{ snap: ["normal", "always"] }],
			/**
			* Scroll Snap Type
			* @see https://tailwindcss.com/docs/scroll-snap-type
			*/
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			/**
			* Scroll Snap Type Strictness
			* @see https://tailwindcss.com/docs/scroll-snap-type
			*/
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			/**
			* Touch Action
			* @see https://tailwindcss.com/docs/touch-action
			*/
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			/**
			* Touch Action X
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			/**
			* Touch Action Y
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			/**
			* Touch Action Pinch Zoom
			* @see https://tailwindcss.com/docs/touch-action
			*/
			"touch-pz": ["touch-pinch-zoom"],
			/**
			* User Select
			* @see https://tailwindcss.com/docs/user-select
			*/
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			/**
			* Will Change
			* @see https://tailwindcss.com/docs/will-change
			*/
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			/**
			* Fill
			* @see https://tailwindcss.com/docs/fill
			*/
			fill: [{ fill: ["none", ...scaleColor()] }],
			/**
			* Stroke Width
			* @see https://tailwindcss.com/docs/stroke-width
			*/
			"stroke-w": [{ stroke: [
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength,
				isArbitraryNumber
			] }],
			/**
			* Stroke
			* @see https://tailwindcss.com/docs/stroke
			*/
			stroke: [{ stroke: ["none", ...scaleColor()] }],
			/**
			* Forced Color Adjust
			* @see https://tailwindcss.com/docs/forced-color-adjust
			*/
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			"container-named": ["container-type"],
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": [
				"start",
				"end",
				"right",
				"left"
			],
			"inset-y": [
				"inset-bs",
				"inset-be",
				"top",
				"bottom"
			],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: [
				"ps",
				"pe",
				"pr",
				"pl"
			],
			py: [
				"pbs",
				"pbe",
				"pt",
				"pb"
			],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: [
				"ms",
				"me",
				"mr",
				"ml"
			],
			my: [
				"mbs",
				"mbe",
				"mt",
				"mb"
			],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": [
				"border-w-s",
				"border-w-e",
				"border-w-r",
				"border-w-l"
			],
			"border-w-y": [
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-b"
			],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": [
				"border-color-s",
				"border-color-e",
				"border-color-r",
				"border-color-l"
			],
			"border-color-y": [
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-b"
			],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": [
				"scroll-ms",
				"scroll-me",
				"scroll-mr",
				"scroll-ml"
			],
			"scroll-my": [
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mb"
			],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": [
				"scroll-ps",
				"scroll-pe",
				"scroll-pr",
				"scroll-pl"
			],
			"scroll-py": [
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pb"
			],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		postfixLookupClassGroups: ["container-type"],
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
};
var twMerge = /*#__PURE__*/ createTailwindMerge(getDefaultConfig);
//#endregion
//#region node_modules/@nous-research/ui/dist/utils/color.js
var hexToRgb = (hex) => [
	parseInt(hex.slice(1, 3), 16),
	parseInt(hex.slice(3, 5), 16),
	parseInt(hex.slice(5, 7), 16)
];
var rgbToHex = (r, g, b) => `#${[
	r,
	g,
	b
].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
var colorDodge = (base, blend) => {
	const [br, bg, bb] = hexToRgb(base);
	const [lr, lg, lb] = hexToRgb(blend);
	const d = (b, l) => l === 255 ? 255 : Math.min(255, Math.floor(b * 255 / (255 - l)));
	return rgbToHex(d(br, lr), d(bg, lg), d(bb, lb));
};
var colorMix = (color, alpha) => `color-mix(in srgb, ${color} ${Math.round(alpha * 100)}%, transparent)`;
//#endregion
//#region node_modules/@nous-research/ui/dist/utils/poly.js
var polyRef = import_react.forwardRef;
//#endregion
//#region node_modules/@nous-research/ui/dist/utils/index.js
var cn = (...inputs) => twMerge(clsx(inputs));
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/typography/index.js
var typographyVariants = cva("font-sans", { variants: {
	compressed: { true: "font-compressed" },
	courier: { true: "font-courier" },
	expanded: { true: "font-expanded" },
	mondwest: { true: "font-mondwest tracking-[0.1875rem]" },
	mono: { true: "font-mono" },
	sans: { true: "font-sans" },
	variant: {
		lg: "text-[2.625rem] leading-[1] tracking-[0.0525rem]",
		md: "text-[2.625rem] leading-[1] tracking-[0.0525rem]",
		sm: "leading-1.4 text-[.9375rem] tracking-[0.1875rem]",
		xl: "text-[4.5rem] leading-[1] tracking-[0.135rem]"
	}
} });
var Typography = polyRef(({ as, className, compressed, courier, expanded, mondwest, mono, variant, ...rest }, ref) => {
	const fonts = {
		compressed,
		courier,
		expanded,
		mondwest,
		mono
	};
	const fontVariant = {
		...fonts,
		sans: !Object.values(fonts).some(Boolean)
	};
	return (0, import_react.createElement)(as ?? "span", {
		...rest,
		className: cn(typographyVariants({
			...fontVariant,
			variant
		}), className),
		ref
	});
});
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/button.js
var SHADOW_DEFAULT = "shadow-[inset_-1px_-1px_0_0_#00000080,inset_1px_1px_0_0_#ffffff80]";
var SHADOW_INVERT = "shadow-[inset_-1px_-1px_0_0_#00000080,inset_1px_1px_0_0_#ffffff29]";
var SHADOW_INVERT_OUTLINED = "shadow-[inset_-1px_-1px_0_0_#ffffff12,inset_1px_1px_0_0_#ffffff29]";
var ACTIVE_FILTER = "active:[filter:invert(1)_brightness(calc(100-99*var(--foreground-alpha,0)))]";
var buttonVariants = cva([
	"group relative grid cursor-pointer grid-cols-[auto_1fr_auto] items-center",
	"text-display leading-0 font-bold tracking-[0.2em]",
	"disabled:pointer-events-none disabled:bg-midground/15 disabled:text-midground disabled:shadow-none"
], {
	compoundVariants: [
		{
			class: `bg-midground text-background-base active:invert ${SHADOW_DEFAULT}`,
			destructive: false,
			ghost: false,
			invert: false,
			outlined: false
		},
		{
			class: `bg-midground/15 text-midground ${SHADOW_INVERT} ${ACTIVE_FILTER}`,
			destructive: false,
			ghost: false,
			invert: true,
			outlined: false
		},
		{
			class: `shadow-midground ${SHADOW_DEFAULT} ${ACTIVE_FILTER}`,
			destructive: false,
			ghost: false,
			invert: false,
			outlined: true
		},
		{
			class: `${SHADOW_INVERT_OUTLINED} ${ACTIVE_FILTER}`,
			destructive: false,
			ghost: false,
			invert: true,
			outlined: true
		},
		{
			class: "bg-transparent text-current hover:bg-midground/10 shadow-none",
			destructive: false,
			ghost: true
		},
		{
			class: "bg-transparent text-destructive hover:bg-destructive/10 shadow-none",
			destructive: true,
			ghost: true
		},
		{
			class: `bg-destructive text-destructive-foreground hover:bg-destructive/90 ${SHADOW_INVERT}`,
			destructive: true,
			ghost: false,
			outlined: false
		},
		{
			class: "border border-destructive/40 bg-transparent text-destructive hover:bg-destructive/10 shadow-none",
			destructive: true,
			ghost: false,
			outlined: true
		}
	],
	defaultVariants: {
		destructive: false,
		ghost: false,
		invert: false,
		outlined: false,
		size: "default"
	},
	variants: {
		destructive: { true: "" },
		ghost: { true: "" },
		invert: { true: "" },
		outlined: { true: "text-midground bg-transparent" },
		size: {
			default: "px-[.9em_.75em] py-[1.25em]",
			icon: "p-2 aspect-square grid-cols-1 place-items-center [&>svg]:size-3.5",
			sm: "px-3 py-1.5 text-[0.7rem] tracking-[0.15em] [&>svg]:size-3",
			xs: "p-1 aspect-square grid-cols-1 place-items-center [&>svg]:size-3"
		}
	}
});
var IconSlot = ({ icon, side }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
	className: cn("absolute top-1/2 -translate-y-1/2", side === "left" ? "left-3" : "right-3"),
	children: typeof icon === "object" ? (0, import_react.cloneElement)(icon, { className: "size-3.5" }) : icon
})] });
var Button$1 = ({ children, className, destructive, ghost, invert, outlined, prefix, size, suffix, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Typography, {
	as: "button",
	className: cn(buttonVariants({
		destructive,
		ghost,
		invert,
		outlined,
		size
	}), className),
	mono: true,
	...props,
	children: [
		!ghost && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "arc-border opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100"
		}),
		prefix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSlot, {
			icon: prefix,
			side: "left"
		}),
		children,
		suffix && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconSlot, {
			icon: suffix,
			side: "right"
		})
	]
});
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/selection-switcher.js
var colors = [
	"oklch(85% 0.12 330)",
	"oklch(85% 0.12 300)",
	"oklch(85% 0.12 270)",
	"oklch(85% 0.12 230)",
	"oklch(85% 0.12 180)",
	"oklch(85% 0.12 150)",
	"oklch(85% 0.12 120)",
	"oklch(85% 0.12 90)",
	"oklch(85% 0.12 60)",
	"oklch(85% 0.12 30)",
	"oklch(88% 0.10 80)"
];
function SelectionSwitcher() {
	(0, import_react.useEffect)(() => {
		const ac = new AbortController();
		const { signal } = ac;
		let idx = 0;
		const cycle = () => requestAnimationFrame(() => document.documentElement.style.setProperty("--selection-bg", colors[idx = (idx + 1) % colors.length]));
		const onKey = (e) => e.key.toLowerCase() === "a" && (e.metaKey || e.ctrlKey) && cycle();
		document.addEventListener("selectstart", cycle, { signal });
		document.addEventListener("keydown", onKey, { signal });
		return () => ac.abort();
	}, []);
	return null;
}
//#endregion
//#region node_modules/unicode-animations/dist/chunk-F2BWZODB.js
var BRAILLE_DOT_MAP = [
	[1, 8],
	[2, 16],
	[4, 32],
	[64, 128]
];
function gridToBraille(grid) {
	const rows = grid.length;
	const cols = grid[0] ? grid[0].length : 0;
	const charCount = Math.ceil(cols / 2);
	let result = "";
	for (let c = 0; c < charCount; c++) {
		let code = 10240;
		for (let r = 0; r < 4 && r < rows; r++) for (let d = 0; d < 2; d++) {
			const col = c * 2 + d;
			if (col < cols && grid[r] && grid[r][col]) code |= BRAILLE_DOT_MAP[r][d];
		}
		result += String.fromCodePoint(code);
	}
	return result;
}
function makeGrid(rows, cols) {
	if (rows <= 0 || cols <= 0) return [];
	return Array.from({ length: rows }, () => Array(cols).fill(false));
}
function genScan() {
	const W = 8, H = 4, frames = [];
	for (let pos = -1; pos < 9; pos++) {
		const g = makeGrid(H, W);
		for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) if (c === pos || c === pos - 1) g[r][c] = true;
		frames.push(gridToBraille(g));
	}
	return frames;
}
function genRain() {
	const W = 8, H = 4, totalFrames = 12, frames = [];
	const offsets = [
		0,
		3,
		1,
		5,
		2,
		7,
		4,
		6
	];
	for (let f = 0; f < totalFrames; f++) {
		const g = makeGrid(H, W);
		for (let c = 0; c < W; c++) {
			const row = (f + offsets[c]) % 6;
			if (row < H) g[row][c] = true;
		}
		frames.push(gridToBraille(g));
	}
	return frames;
}
function genScanLine() {
	const W = 6, H = 4, frames = [];
	for (const row of [
		0,
		1,
		2,
		3,
		2,
		1
	]) {
		const g = makeGrid(H, W);
		for (let c = 0; c < W; c++) {
			g[row][c] = true;
			if (row > 0) g[row - 1][c] = c % 2 === 0;
		}
		frames.push(gridToBraille(g));
	}
	return frames;
}
function genPulse() {
	const W = 6, H = 4, frames = [];
	const cx = W / 2 - .5, cy = H / 2 - .5;
	for (const r of [
		.5,
		1.2,
		2,
		3,
		3.5
	]) {
		const g = makeGrid(H, W);
		for (let row = 0; row < H; row++) for (let col = 0; col < W; col++) {
			const dist = Math.sqrt((col - cx) ** 2 + (row - cy) ** 2);
			if (Math.abs(dist - r) < .9) g[row][col] = true;
		}
		frames.push(gridToBraille(g));
	}
	return frames;
}
function genSnake() {
	const W = 4, H = 4;
	const path = [];
	for (let r = 0; r < H; r++) if (r % 2 === 0) for (let c = 0; c < W; c++) path.push([r, c]);
	else for (let c = 3; c >= 0; c--) path.push([r, c]);
	const frames = [];
	for (let i = 0; i < path.length; i++) {
		const g = makeGrid(H, W);
		for (let t = 0; t < 4; t++) {
			const idx = (i - t + path.length) % path.length;
			g[path[idx][0]][path[idx][1]] = true;
		}
		frames.push(gridToBraille(g));
	}
	return frames;
}
function genSparkle() {
	const patterns = [
		[
			1,
			0,
			0,
			1,
			0,
			0,
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			1,
			0,
			0,
			1,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0
		],
		[
			0,
			1,
			0,
			0,
			1,
			0,
			0,
			1,
			1,
			0,
			0,
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			1,
			0,
			1,
			0
		],
		[
			0,
			0,
			1,
			0,
			0,
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			1,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			1,
			0,
			1,
			0,
			0,
			0,
			1
		],
		[
			1,
			0,
			0,
			0,
			0,
			0,
			1,
			1,
			0,
			0,
			1,
			0,
			1,
			0,
			0,
			0,
			0,
			0,
			0,
			0,
			1,
			0,
			1,
			0,
			1,
			0,
			0,
			1,
			0,
			0,
			1,
			0
		],
		[
			0,
			0,
			0,
			1,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1,
			0,
			1,
			1,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1,
			0,
			1
		],
		[
			0,
			1,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			1,
			0,
			0,
			1,
			0,
			0,
			0,
			1,
			0,
			0,
			0,
			0,
			1,
			0,
			1,
			0,
			0,
			0
		]
	];
	const W = 8, H = 4, frames = [];
	for (const pat of patterns) {
		const g = makeGrid(H, W);
		for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) g[r][c] = !!pat[r * W + c];
		frames.push(gridToBraille(g));
	}
	return frames;
}
function genCascade() {
	const W = 8, H = 4, frames = [];
	for (let offset = -2; offset < 12; offset++) {
		const g = makeGrid(H, W);
		for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) {
			const diag = c + r;
			if (diag === offset || diag === offset - 1) g[r][c] = true;
		}
		frames.push(gridToBraille(g));
	}
	return frames;
}
function genColumns() {
	const W = 6, H = 4, frames = [];
	for (let col = 0; col < W; col++) for (let fillTo = 3; fillTo >= 0; fillTo--) {
		const g = makeGrid(H, W);
		for (let pc = 0; pc < col; pc++) for (let r = 0; r < H; r++) g[r][pc] = true;
		for (let r = fillTo; r < H; r++) g[r][col] = true;
		frames.push(gridToBraille(g));
	}
	const full = makeGrid(H, W);
	for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) full[r][c] = true;
	frames.push(gridToBraille(full));
	frames.push(gridToBraille(makeGrid(H, W)));
	return frames;
}
function genOrbit() {
	const W = 2, H = 4;
	const path = [
		[0, 0],
		[0, 1],
		[1, 1],
		[2, 1],
		[3, 1],
		[3, 0],
		[2, 0],
		[1, 0]
	];
	const frames = [];
	for (let i = 0; i < path.length; i++) {
		const g = makeGrid(H, W);
		g[path[i][0]][path[i][1]] = true;
		const t1 = (i - 1 + path.length) % path.length;
		g[path[t1][0]][path[t1][1]] = true;
		frames.push(gridToBraille(g));
	}
	return frames;
}
function genBreathe() {
	const stages = [
		[],
		[[1, 0]],
		[[0, 1], [2, 0]],
		[
			[0, 0],
			[1, 1],
			[3, 0]
		],
		[
			[0, 0],
			[1, 1],
			[2, 0],
			[3, 1]
		],
		[
			[0, 0],
			[0, 1],
			[1, 1],
			[2, 0],
			[3, 1]
		],
		[
			[0, 0],
			[0, 1],
			[1, 0],
			[2, 1],
			[3, 0],
			[3, 1]
		],
		[
			[0, 0],
			[0, 1],
			[1, 0],
			[1, 1],
			[2, 0],
			[3, 0],
			[3, 1]
		],
		[
			[0, 0],
			[0, 1],
			[1, 0],
			[1, 1],
			[2, 0],
			[2, 1],
			[3, 0],
			[3, 1]
		]
	];
	const frames = [];
	const sequence = [...stages, ...stages.slice().reverse().slice(1)];
	for (const dots of sequence) {
		const g = makeGrid(4, 2);
		for (const [r, c] of dots) g[r][c] = true;
		frames.push(gridToBraille(g));
	}
	return frames;
}
function genWaveRows() {
	const W = 8, H = 4, totalFrames = 16, frames = [];
	for (let f = 0; f < totalFrames; f++) {
		const g = makeGrid(H, W);
		for (let c = 0; c < W; c++) {
			const phase = f - c * .5;
			const row = Math.round((Math.sin(phase * .8) + 1) / 2 * 3);
			g[row][c] = true;
			if (row > 0) g[row - 1][c] = (f + c) % 3 === 0;
		}
		frames.push(gridToBraille(g));
	}
	return frames;
}
function genCheckerboard() {
	const W = 6, H = 4, frames = [];
	for (let phase = 0; phase < 4; phase++) {
		const g = makeGrid(H, W);
		for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) if (phase < 2) g[r][c] = (r + c + phase) % 2 === 0;
		else g[r][c] = (r + c + phase) % 3 === 0;
		frames.push(gridToBraille(g));
	}
	return frames;
}
function genHelix() {
	const W = 8, H = 4, totalFrames = 16, frames = [];
	for (let f = 0; f < totalFrames; f++) {
		const g = makeGrid(H, W);
		for (let c = 0; c < W; c++) {
			const phase = (f + c) * (Math.PI / 4);
			const y1 = Math.round((Math.sin(phase) + 1) / 2 * 3);
			const y2 = Math.round((Math.sin(phase + Math.PI) + 1) / 2 * 3);
			g[y1][c] = true;
			g[y2][c] = true;
		}
		frames.push(gridToBraille(g));
	}
	return frames;
}
function genFillSweep() {
	const W = 4, H = 4, frames = [];
	for (let row = 3; row >= 0; row--) {
		const g = makeGrid(H, W);
		for (let r = row; r < H; r++) for (let c = 0; c < W; c++) g[r][c] = true;
		frames.push(gridToBraille(g));
	}
	const full = makeGrid(H, W);
	for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) full[r][c] = true;
	frames.push(gridToBraille(full));
	frames.push(gridToBraille(full));
	for (let row = 0; row < H; row++) {
		const g = makeGrid(H, W);
		for (let r = row + 1; r < H; r++) for (let c = 0; c < W; c++) g[r][c] = true;
		frames.push(gridToBraille(g));
	}
	frames.push(gridToBraille(makeGrid(H, W)));
	return frames;
}
function genDiagonalSwipe() {
	const W = 4, H = 4, frames = [];
	const maxDiag = 6;
	for (let d = 0; d <= maxDiag; d++) {
		const g = makeGrid(H, W);
		for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) if (r + c <= d) g[r][c] = true;
		frames.push(gridToBraille(g));
	}
	const full = makeGrid(H, W);
	for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) full[r][c] = true;
	frames.push(gridToBraille(full));
	for (let d = 0; d <= maxDiag; d++) {
		const g = makeGrid(H, W);
		for (let r = 0; r < H; r++) for (let c = 0; c < W; c++) if (r + c > d) g[r][c] = true;
		frames.push(gridToBraille(g));
	}
	frames.push(gridToBraille(makeGrid(H, W)));
	return frames;
}
var braille_default = {
	braille: {
		frames: [
			"⠋",
			"⠙",
			"⠹",
			"⠸",
			"⠼",
			"⠴",
			"⠦",
			"⠧",
			"⠇",
			"⠏"
		],
		interval: 80
	},
	braillewave: {
		frames: [
			"⠁⠂⠄⡀",
			"⠂⠄⡀⢀",
			"⠄⡀⢀⠠",
			"⡀⢀⠠⠐",
			"⢀⠠⠐⠈",
			"⠠⠐⠈⠁",
			"⠐⠈⠁⠂",
			"⠈⠁⠂⠄"
		],
		interval: 100
	},
	dna: {
		frames: [
			"⠋⠉⠙⠚",
			"⠉⠙⠚⠒",
			"⠙⠚⠒⠂",
			"⠚⠒⠂⠂",
			"⠒⠂⠂⠒",
			"⠂⠂⠒⠲",
			"⠂⠒⠲⠴",
			"⠒⠲⠴⠤",
			"⠲⠴⠤⠄",
			"⠴⠤⠄⠋",
			"⠤⠄⠋⠉",
			"⠄⠋⠉⠙"
		],
		interval: 80
	},
	scan: {
		frames: genScan(),
		interval: 70
	},
	rain: {
		frames: genRain(),
		interval: 100
	},
	scanline: {
		frames: genScanLine(),
		interval: 120
	},
	pulse: {
		frames: genPulse(),
		interval: 180
	},
	snake: {
		frames: genSnake(),
		interval: 80
	},
	sparkle: {
		frames: genSparkle(),
		interval: 150
	},
	cascade: {
		frames: genCascade(),
		interval: 60
	},
	columns: {
		frames: genColumns(),
		interval: 60
	},
	orbit: {
		frames: genOrbit(),
		interval: 100
	},
	breathe: {
		frames: genBreathe(),
		interval: 100
	},
	waverows: {
		frames: genWaveRows(),
		interval: 90
	},
	checkerboard: {
		frames: genCheckerboard(),
		interval: 250
	},
	helix: {
		frames: genHelix(),
		interval: 80
	},
	fillsweep: {
		frames: genFillSweep(),
		interval: 100
	},
	diagswipe: {
		frames: genDiagonalSwipe(),
		interval: 60
	}
};
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/spinner.js
function Spinner({ className, name = "braille", style, ...props }) {
	const [frame, setFrame] = (0, import_react.useState)(0);
	const animation = braille_default[name];
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setFrame((f) => (f + 1) % animation.frames.length), animation.interval);
		return () => clearInterval(id);
	}, [animation.frames.length, animation.interval]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-hidden": props["aria-label"] ? void 0 : true,
		className: cn("font-mono inline-block leading-none tabular-nums", className),
		style,
		...props,
		children: animation.frames[frame]
	});
}
//#endregion
//#region node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var __defProp$21 = Object.defineProperty;
var __name$21 = (target, value) => __defProp$21(target, "name", {
	value,
	configurable: true
});
function setRef$1(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
__name$21(setRef$1, "setRef");
function composeRefs(...refs) {
	return (node) => {
		let hasCleanup = false;
		const cleanups = refs.map((ref) => {
			const cleanup = setRef$1(ref, node);
			if (!hasCleanup && typeof cleanup == "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup == "function") cleanup();
				else setRef$1(refs[i], null);
			}
		};
	};
}
__name$21(composeRefs, "composeRefs");
function useComposedRefs(...refs) {
	return import_react.useCallback(composeRefs(...refs), refs);
}
__name$21(useComposedRefs, "useComposedRefs");
//#endregion
//#region node_modules/@radix-ui/react-slot/dist/index.mjs
var __defProp$20 = Object.defineProperty;
var __name$20 = (target, value) => __defProp$20(target, "name", {
	value,
	configurable: true
});
// @__NO_SIDE_EFFECTS__
function createSlot(ownerName) {
	const Slot2 = import_react.forwardRef((props, forwardedRef) => {
		let { children, ...slotProps } = props;
		let slottableElement = null;
		let hasSlottable = false;
		const newChildren = [];
		if (isLazyComponent(children) && typeof use === "function") children = use(children._payload);
		import_react.Children.forEach(children, (maybeSlottable) => {
			if (isSlottable(maybeSlottable)) {
				hasSlottable = true;
				const slottable = maybeSlottable;
				let child = "child" in slottable.props ? slottable.props.child : slottable.props.children;
				if (isLazyComponent(child) && typeof use === "function") child = use(child._payload);
				slottableElement = getSlottableElementFromSlottable(slottable, child);
				newChildren.push(slottableElement?.props?.children);
			} else newChildren.push(maybeSlottable);
		});
		if (slottableElement) slottableElement = import_react.cloneElement(slottableElement, void 0, newChildren);
		else if (!hasSlottable && import_react.Children.count(children) === 1 && import_react.isValidElement(children)) slottableElement = children;
		const slottableElementRef = slottableElement ? getElementRef$1(slottableElement) : void 0;
		const composedRef = useComposedRefs(forwardedRef, slottableElementRef);
		if (!slottableElement) {
			if (children || children === 0) throw new Error(hasSlottable ? createSlottableError(ownerName) : createSlotError(ownerName));
			return children;
		}
		const mergedProps = mergeProps(slotProps, slottableElement.props ?? {});
		if (slottableElement.type !== import_react.Fragment) mergedProps.ref = forwardedRef ? composedRef : slottableElementRef;
		return import_react.cloneElement(slottableElement, mergedProps);
	});
	Slot2.displayName = `${ownerName}.Slot`;
	return Slot2;
}
__name$20(createSlot, "createSlot");
var SLOTTABLE_IDENTIFIER = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function createSlottable(ownerName) {
	const Slottable2 = /* @__PURE__ */ __name$20((props) => "child" in props ? props.children(props.child) : props.children, "Slottable");
	Slottable2.displayName = `${ownerName}.Slottable`;
	Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
	return Slottable2;
}
__name$20(createSlottable, "createSlottable");
var getSlottableElementFromSlottable = /* @__PURE__ */ __name$20((slottable, child) => {
	if ("child" in slottable.props) {
		const child2 = slottable.props.child;
		if (!import_react.isValidElement(child2)) return null;
		return import_react.cloneElement(child2, void 0, slottable.props.children(child2.props.children));
	}
	return import_react.isValidElement(child) ? child : null;
}, "getSlottableElementFromSlottable");
function mergeProps(slotProps, childProps) {
	const overrideProps = { ...childProps };
	for (const propName in childProps) {
		const slotPropValue = slotProps[propName];
		const childPropValue = childProps[propName];
		if (/^on[A-Z]/.test(propName)) {
			if (slotPropValue && childPropValue) overrideProps[propName] = (...args) => {
				const result = childPropValue(...args);
				slotPropValue(...args);
				return result;
			};
			else if (slotPropValue) overrideProps[propName] = slotPropValue;
		} else if (propName === "style") overrideProps[propName] = {
			...slotPropValue,
			...childPropValue
		};
		else if (propName === "className") overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
		else if (propName === "aria-describedby") overrideProps[propName] = concatAriaDescribedby$2(childPropValue, slotPropValue);
	}
	return {
		...slotProps,
		...overrideProps
	};
}
__name$20(mergeProps, "mergeProps");
function getElementRef$1(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
__name$20(getElementRef$1, "getElementRef");
function isSlottable(child) {
	return import_react.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
__name$20(isSlottable, "isSlottable");
var REACT_LAZY_TYPE = Symbol.for("react.lazy");
function isLazyComponent(element) {
	return element != null && typeof element === "object" && "$$typeof" in element && element.$$typeof === REACT_LAZY_TYPE && "_payload" in element && isPromiseLike(element._payload);
}
__name$20(isLazyComponent, "isLazyComponent");
function isPromiseLike(value) {
	return typeof value === "object" && value !== null && "then" in value;
}
__name$20(isPromiseLike, "isPromiseLike");
function concatAriaDescribedby$2(...values) {
	const ids = /* @__PURE__ */ new Set();
	for (const value of values) {
		if (typeof value !== "string") continue;
		for (const id of String(value).trim().split(/\s+/)) if (id) ids.add(id);
	}
	return ids.size > 0 ? Array.from(ids).join(" ") : void 0;
}
__name$20(concatAriaDescribedby$2, "concatAriaDescribedby");
var createSlotError = /* @__PURE__ */ __name$20((ownerName) => {
	return `${ownerName} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`;
}, "createSlotError");
var createSlottableError = /* @__PURE__ */ __name$20((ownerName) => {
	return `${ownerName} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`;
}, "createSlottableError");
var use = import_react[" use ".trim().toString()];
//#endregion
//#region node_modules/@radix-ui/react-primitive/dist/index.mjs
var __defProp$19 = Object.defineProperty;
var __name$19 = (target, value) => __defProp$19(target, "name", {
	value,
	configurable: true
});
var Primitive = [
	"a",
	"button",
	"div",
	"form",
	"h2",
	"h3",
	"img",
	"input",
	"label",
	"li",
	"nav",
	"ol",
	"p",
	"select",
	"span",
	"svg",
	"ul"
].reduce((primitive, node) => {
	const Slot = /* @__PURE__ */ createSlot(`Primitive.${node}`);
	const Node = import_react.forwardRef((props, forwardedRef) => {
		const { asChild, ...primitiveProps } = props;
		const Comp = asChild ? Slot : node;
		if (typeof window !== "undefined") window[Symbol.for("radix-ui")] = true;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Comp, {
			...primitiveProps,
			ref: forwardedRef
		});
	});
	Node.displayName = `Primitive.${node}`;
	return {
		...primitive,
		[node]: Node
	};
}, {});
function dispatchDiscreteCustomEvent(target, event) {
	if (target) import_react_dom.flushSync(() => target.dispatchEvent(event));
}
__name$19(dispatchDiscreteCustomEvent, "dispatchDiscreteCustomEvent");
//#endregion
//#region node_modules/@radix-ui/react-visually-hidden/dist/index.mjs
var __defProp$18 = Object.defineProperty;
var __name$18 = (target, value) => __defProp$18(target, "name", {
	value,
	configurable: true
});
var VISUALLY_HIDDEN_STYLES = Object.freeze({
	position: "absolute",
	border: 0,
	width: 1,
	height: 1,
	padding: 0,
	margin: -1,
	overflow: "hidden",
	clip: "rect(0, 0, 0, 0)",
	whiteSpace: "nowrap",
	wordWrap: "normal"
});
var VisuallyHidden = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$18(function VisuallyHidden2(props, forwardedRef) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
		...props,
		ref: forwardedRef,
		style: {
			...VISUALLY_HIDDEN_STYLES,
			...props.style
		}
	});
}, "VisuallyHidden"));
//#endregion
//#region node_modules/@radix-ui/react-context/dist/index.mjs
var __defProp$17 = Object.defineProperty;
var __name$17 = (target, value) => __defProp$17(target, "name", {
	value,
	configurable: true
});
// @__NO_SIDE_EFFECTS__
function createContext2(rootComponentName, defaultContext) {
	const Context = import_react.createContext(defaultContext);
	Context.displayName = rootComponentName + "Context";
	const Provider = /* @__PURE__ */ __name$17((props) => {
		const { children, ...context } = props;
		const value = import_react.useMemo(() => context, Object.values(context));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
			value,
			children
		});
	}, "Provider");
	Provider.displayName = rootComponentName + "Provider";
	function useContext2(consumerName, options = {}) {
		const { optional = false } = options;
		const context = import_react.useContext(Context);
		if (context) return context;
		if (defaultContext !== void 0) return defaultContext;
		if (optional) return void 0;
		throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
	}
	__name$17(useContext2, "useContext");
	return [Provider, useContext2];
}
__name$17(createContext2, "createContext");
// @__NO_SIDE_EFFECTS__
function createContextScope(scopeName, createContextScopeDeps = []) {
	let defaultContexts = [];
	function createContext3(rootComponentName, defaultContext) {
		const BaseContext = import_react.createContext(defaultContext);
		BaseContext.displayName = rootComponentName + "Context";
		const index = defaultContexts.length;
		defaultContexts = [...defaultContexts, defaultContext];
		const Provider = /* @__PURE__ */ __name$17((props) => {
			const { scope, children, ...context } = props;
			const Context = scope?.[scopeName]?.[index] || BaseContext;
			const value = import_react.useMemo(() => context, Object.values(context));
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
				value,
				children
			});
		}, "Provider");
		Provider.displayName = rootComponentName + "Provider";
		function useContext2(consumerName, scope, options = {}) {
			const { optional = false } = options;
			const Context = scope?.[scopeName]?.[index] || BaseContext;
			const context = import_react.useContext(Context);
			if (context) return context;
			if (defaultContext !== void 0) return defaultContext;
			if (optional) return void 0;
			throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
		}
		__name$17(useContext2, "useContext");
		return [Provider, useContext2];
	}
	__name$17(createContext3, "createContext");
	const createScope = /* @__PURE__ */ __name$17(() => {
		const scopeContexts = defaultContexts.map((defaultContext) => {
			return import_react.createContext(defaultContext);
		});
		return /* @__PURE__ */ __name$17(function useScope(scope) {
			const contexts = scope?.[scopeName] || scopeContexts;
			return import_react.useMemo(() => ({ [`__scope${scopeName}`]: {
				...scope,
				[scopeName]: contexts
			} }), [scope, contexts]);
		}, "useScope");
	}, "createScope");
	createScope.scopeName = scopeName;
	return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
__name$17(createContextScope, "createContextScope");
function composeContextScopes(...scopes) {
	const baseScope = scopes[0];
	if (scopes.length === 1) return baseScope;
	const createScope = /* @__PURE__ */ __name$17(() => {
		const scopeHooks = scopes.map((createScope2) => ({
			useScope: createScope2(),
			scopeName: createScope2.scopeName
		}));
		return /* @__PURE__ */ __name$17(function useComposedScopes(overrideScopes) {
			const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
				const currentScope = useScope(overrideScopes)[`__scope${scopeName}`];
				return {
					...nextScopes2,
					...currentScope
				};
			}, {});
			return import_react.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
		}, "useComposedScopes");
	}, "createScope");
	createScope.scopeName = baseScope.scopeName;
	return createScope;
}
__name$17(composeContextScopes, "composeContextScopes");
//#endregion
//#region node_modules/@radix-ui/primitive/dist/index.mjs
var __defProp$16 = Object.defineProperty;
var __name$16 = (target, value) => __defProp$16(target, "name", {
	value,
	configurable: true
});
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
function composeEventHandlers$1(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
	return /* @__PURE__ */ __name$16(function handleEvent(event) {
		originalEventHandler?.(event);
		if (checkForDefaultPrevented === false || !event || !event.defaultPrevented) return ourEventHandler?.(event);
	}, "handleEvent");
}
__name$16(composeEventHandlers$1, "composeEventHandlers");
function getOwnerWindow(element) {
	if (!canUseDOM) throw new Error("Cannot access window outside of the DOM");
	return element?.ownerDocument?.defaultView ?? window;
}
__name$16(getOwnerWindow, "getOwnerWindow");
function getOwnerDocument(element) {
	if (!canUseDOM) throw new Error("Cannot access document outside of the DOM");
	return element?.ownerDocument ?? document;
}
__name$16(getOwnerDocument, "getOwnerDocument");
function getActiveElement(node, activeDescendant = false) {
	const { activeElement } = getOwnerDocument(node);
	if (!activeElement?.nodeName) return null;
	if (isFrame(activeElement) && activeElement.contentDocument) return getActiveElement(activeElement.contentDocument.body, activeDescendant);
	if (activeDescendant) {
		const id = activeElement.getAttribute("aria-activedescendant");
		if (id) {
			const element = getOwnerDocument(activeElement).getElementById(id);
			if (element) return element;
		}
	}
	return activeElement;
}
__name$16(getActiveElement, "getActiveElement");
function isFrame(element) {
	return element.tagName === "IFRAME";
}
__name$16(isFrame, "isFrame");
//#endregion
//#region node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var useLayoutEffect2 = globalThis?.document ? import_react.useLayoutEffect : () => {};
//#endregion
//#region node_modules/@radix-ui/react-use-effect-event/dist/index.mjs
var __defProp$15 = Object.defineProperty;
var __name$15 = (target, value) => __defProp$15(target, "name", {
	value,
	configurable: true
});
var useReactEffectEvent = import_react[" useEffectEvent ".trim().toString()];
var useReactInsertionEffect = import_react[" useInsertionEffect ".trim().toString()];
function useEffectEvent(callback) {
	if (typeof useReactEffectEvent === "function") return useReactEffectEvent(callback);
	const ref = import_react.useRef(() => {
		throw new Error("Cannot call an event handler while rendering.");
	});
	if (typeof useReactInsertionEffect === "function") useReactInsertionEffect(() => {
		ref.current = callback;
	});
	else useLayoutEffect2(() => {
		ref.current = callback;
	});
	return import_react.useMemo(() => ((...args) => ref.current?.(...args)), []);
}
__name$15(useEffectEvent, "useEffectEvent");
//#endregion
//#region node_modules/@radix-ui/react-use-controllable-state/dist/index.mjs
var __defProp$14 = Object.defineProperty;
var __name$14 = (target, value) => __defProp$14(target, "name", {
	value,
	configurable: true
});
var useInsertionEffect = import_react[" useInsertionEffect ".trim().toString()] || useLayoutEffect2;
function useControllableState({ prop, defaultProp, onChange = /* @__PURE__ */ __name$14(() => {}, "onChange"), caller }) {
	const [uncontrolledProp, setUncontrolledProp, onChangeRef] = useUncontrolledState({
		defaultProp,
		onChange
	});
	const isControlled = prop !== void 0;
	return [isControlled ? prop : uncontrolledProp, import_react.useCallback((nextValue) => {
		if (isControlled) {
			const value2 = isFunction$1(nextValue) ? nextValue(prop) : nextValue;
			if (value2 !== prop) onChangeRef.current?.(value2);
		} else setUncontrolledProp(nextValue);
	}, [
		isControlled,
		prop,
		setUncontrolledProp,
		onChangeRef
	])];
}
__name$14(useControllableState, "useControllableState");
function useUncontrolledState({ defaultProp, onChange }) {
	const [value, setValue] = import_react.useState(defaultProp);
	const prevValueRef = import_react.useRef(value);
	const onChangeRef = import_react.useRef(onChange);
	useInsertionEffect(() => {
		onChangeRef.current = onChange;
	}, [onChange]);
	import_react.useEffect(() => {
		if (prevValueRef.current !== value) {
			onChangeRef.current?.(value);
			prevValueRef.current = value;
		}
	}, [value, prevValueRef]);
	return [
		value,
		setValue,
		onChangeRef
	];
}
__name$14(useUncontrolledState, "useUncontrolledState");
function isFunction$1(value) {
	return typeof value === "function";
}
__name$14(isFunction$1, "isFunction");
var SYNC_STATE = Symbol("RADIX:SYNC_STATE");
function useControllableStateReducer(reducer, userArgs, initialArg, init) {
	const { prop: controlledState, defaultProp, onChange: onChangeProp, caller } = userArgs;
	const isControlled = controlledState !== void 0;
	const onChange = useEffectEvent(onChangeProp);
	const args = [{
		...initialArg,
		state: defaultProp
	}];
	if (init) args.push(init);
	const [internalState, dispatch] = import_react.useReducer((state2, action) => {
		if (action.type === SYNC_STATE) return {
			...state2,
			state: action.state
		};
		const next = reducer(state2, action);
		if (isControlled && !Object.is(next.state, state2.state)) onChange(next.state);
		return next;
	}, ...args);
	const uncontrolledState = internalState.state;
	const prevValueRef = import_react.useRef(uncontrolledState);
	import_react.useEffect(() => {
		if (prevValueRef.current !== uncontrolledState) {
			prevValueRef.current = uncontrolledState;
			if (!isControlled) onChange(uncontrolledState);
		}
	}, [
		uncontrolledState,
		prevValueRef,
		isControlled
	]);
	const state = import_react.useMemo(() => {
		if (controlledState !== void 0) return {
			...internalState,
			state: controlledState
		};
		return internalState;
	}, [internalState, controlledState]);
	import_react.useEffect(() => {
		if (isControlled && !Object.is(controlledState, internalState.state)) dispatch({
			type: SYNC_STATE,
			state: controlledState
		});
	}, [
		controlledState,
		internalState.state,
		isControlled
	]);
	return [state, dispatch];
}
__name$14(useControllableStateReducer, "useControllableStateReducer");
//#endregion
//#region node_modules/@radix-ui/react-presence/dist/index.mjs
var __defProp$13 = Object.defineProperty;
var __name$13 = (target, value) => __defProp$13(target, "name", {
	value,
	configurable: true
});
function useStateMachine(initialState, machine) {
	return import_react.useReducer((state, event) => {
		return machine[state][event] ?? state;
	}, initialState);
}
__name$13(useStateMachine, "useStateMachine");
var Presence = /* @__PURE__ */ __name$13((props) => {
	const { present, children } = props;
	const presence = usePresence(present);
	const child = typeof children === "function" ? children({ present: presence.isPresent }) : import_react.Children.only(children);
	const ref = useStableComposedRefs(presence.ref, getElementRef(child));
	return typeof children === "function" || presence.isPresent ? import_react.cloneElement(child, { ref }) : null;
}, "Presence");
function usePresence(present) {
	const [node, setNode] = import_react.useState();
	const stylesRef = import_react.useRef(null);
	const prevPresentRef = import_react.useRef(present);
	const prevAnimationNameRef = import_react.useRef("none");
	const mountAnimationNameRef = import_react.useRef(void 0);
	const [state, send] = useStateMachine(present ? "mounted" : "unmounted", {
		mounted: {
			UNMOUNT: "unmounted",
			ANIMATION_OUT: "unmountSuspended"
		},
		unmountSuspended: {
			MOUNT: "mounted",
			ANIMATION_END: "unmounted"
		},
		unmounted: { MOUNT: "mounted" }
	});
	import_react.useEffect(() => {
		if (state === "mounted") {
			prevAnimationNameRef.current = mountAnimationNameRef.current ?? getAnimationName(stylesRef.current);
			mountAnimationNameRef.current = void 0;
		} else prevAnimationNameRef.current = "none";
	}, [state]);
	useLayoutEffect2(() => {
		const styles = stylesRef.current;
		const wasPresent = prevPresentRef.current;
		if (wasPresent !== present) {
			const prevAnimationName = prevAnimationNameRef.current;
			const currentAnimationName = getAnimationName(styles);
			if (present) {
				mountAnimationNameRef.current = currentAnimationName;
				send("MOUNT");
			} else if (currentAnimationName === "none" || styles?.display === "none") send("UNMOUNT");
			else if (wasPresent && prevAnimationName !== currentAnimationName) send("ANIMATION_OUT");
			else send("UNMOUNT");
			prevPresentRef.current = present;
		}
	}, [present, send]);
	useLayoutEffect2(() => {
		if (node) {
			let timeoutId;
			const ownerWindow = node.ownerDocument.defaultView ?? window;
			const handleAnimationEnd = /* @__PURE__ */ __name$13((event) => {
				const isCurrentAnimation = getAnimationName(stylesRef.current).includes(CSS.escape(event.animationName));
				if (event.target === node && isCurrentAnimation) {
					send("ANIMATION_END");
					if (!prevPresentRef.current) {
						const currentFillMode = node.style.animationFillMode;
						node.style.animationFillMode = "forwards";
						timeoutId = ownerWindow.setTimeout(() => {
							if (node.style.animationFillMode === "forwards") node.style.animationFillMode = currentFillMode;
						});
					}
				}
			}, "handleAnimationEnd");
			const handleAnimationStart = /* @__PURE__ */ __name$13((event) => {
				if (event.target === node) prevAnimationNameRef.current = getAnimationName(stylesRef.current);
			}, "handleAnimationStart");
			node.addEventListener("animationstart", handleAnimationStart);
			node.addEventListener("animationcancel", handleAnimationEnd);
			node.addEventListener("animationend", handleAnimationEnd);
			return () => {
				ownerWindow.clearTimeout(timeoutId);
				node.removeEventListener("animationstart", handleAnimationStart);
				node.removeEventListener("animationcancel", handleAnimationEnd);
				node.removeEventListener("animationend", handleAnimationEnd);
			};
		} else send("ANIMATION_END");
	}, [node, send]);
	return {
		isPresent: ["mounted", "unmountSuspended"].includes(state),
		ref: import_react.useCallback((node2) => {
			if (node2) {
				const styles = getComputedStyle(node2);
				stylesRef.current = styles;
				mountAnimationNameRef.current = getAnimationName(styles);
			} else stylesRef.current = null;
			setNode(node2);
		}, [])
	};
}
__name$13(usePresence, "usePresence");
function setRef(ref, value) {
	if (typeof ref === "function") return ref(value);
	else if (ref !== null && ref !== void 0) ref.current = value;
}
__name$13(setRef, "setRef");
function useStableComposedRefs(...refs) {
	const refsRef = import_react.useRef(refs);
	refsRef.current = refs;
	return import_react.useCallback((node) => {
		const currentRefs = refsRef.current;
		let hasCleanup = false;
		const cleanups = currentRefs.map((ref) => {
			const cleanup = setRef(ref, node);
			if (!hasCleanup && typeof cleanup === "function") hasCleanup = true;
			return cleanup;
		});
		if (hasCleanup) return () => {
			for (let i = 0; i < cleanups.length; i++) {
				const cleanup = cleanups[i];
				if (typeof cleanup === "function") cleanup();
				else setRef(currentRefs[i], null);
			}
		};
	}, []);
}
__name$13(useStableComposedRefs, "useStableComposedRefs");
function getAnimationName(styles) {
	return styles?.animationName || "none";
}
__name$13(getAnimationName, "getAnimationName");
function getElementRef(element) {
	let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
	let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.ref;
	getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
	mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
	if (mayWarn) return element.props.ref;
	return element.props.ref || element.ref;
}
__name$13(getElementRef, "getElementRef");
//#endregion
//#region node_modules/@radix-ui/react-id/dist/index.mjs
var __defProp$12 = Object.defineProperty;
var __name$12 = (target, value) => __defProp$12(target, "name", {
	value,
	configurable: true
});
var useReactId = import_react[" useId ".trim().toString()] || (() => void 0);
var count$1 = 0;
function useId(deterministicId) {
	const [id, setId] = import_react.useState(useReactId());
	useLayoutEffect2(() => {
		if (!deterministicId) setId((reactId) => reactId ?? String(count$1++));
	}, [deterministicId]);
	return deterministicId || (id ? `radix-${id}` : "");
}
__name$12(useId, "useId");
//#endregion
//#region node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var __defProp$11 = Object.defineProperty;
var __name$11 = (target, value) => __defProp$11(target, "name", {
	value,
	configurable: true
});
function useCallbackRef$1(callback) {
	const callbackRef = import_react.useRef(callback);
	import_react.useEffect(() => {
		callbackRef.current = callback;
	});
	return import_react.useMemo(() => ((...args) => callbackRef.current?.(...args)), []);
}
__name$11(useCallbackRef$1, "useCallbackRef");
//#endregion
//#region node_modules/@radix-ui/react-dismissable-layer/dist/index.mjs
var __defProp$10 = Object.defineProperty;
var __name$10 = (target, value) => __defProp$10(target, "name", {
	value,
	configurable: true
});
var CONTEXT_UPDATE = "dismissableLayer.update";
var POINTER_DOWN_OUTSIDE = "dismissableLayer.pointerDownOutside";
var FOCUS_OUTSIDE = "dismissableLayer.focusOutside";
var originalBodyPointerEvents;
var DismissableLayerContext = import_react.createContext({
	layers: /* @__PURE__ */ new Set(),
	layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
	branches: /* @__PURE__ */ new Set(),
	dismissableSurfaces: /* @__PURE__ */ new Set()
});
var DismissableLayer = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$10(function DismissableLayer2(props, forwardedRef) {
	const { disableOutsidePointerEvents = false, deferPointerDownOutside = false, onEscapeKeyDown, onPointerDownOutside, onFocusOutside, onInteractOutside, onDismiss, ...layerProps } = props;
	const context = import_react.useContext(DismissableLayerContext);
	const [node, setNode] = import_react.useState(null);
	const ownerDocument = node?.ownerDocument ?? globalThis?.document;
	const [, force] = import_react.useState({});
	const composedRefs = useComposedRefs(forwardedRef, setNode);
	const layers = Array.from(context.layers);
	const [highestLayerWithOutsidePointerEventsDisabled] = [...context.layersWithOutsidePointerEventsDisabled].slice(-1);
	const highestLayerWithOutsidePointerEventsDisabledIndex = highestLayerWithOutsidePointerEventsDisabled ? layers.indexOf(highestLayerWithOutsidePointerEventsDisabled) : -1;
	const index = node ? layers.indexOf(node) : -1;
	const isBodyPointerEventsDisabled = context.layersWithOutsidePointerEventsDisabled.size > 0;
	const isPointerEventsEnabled = index >= highestLayerWithOutsidePointerEventsDisabledIndex;
	const isDeferredPointerDownOutsideRef = import_react.useRef(false);
	const pointerDownOutside = usePointerDownOutside((event) => {
		onPointerDownOutside?.(event);
		onInteractOutside?.(event);
		if (!event.defaultPrevented) onDismiss?.();
	}, {
		ownerDocument,
		deferPointerDownOutside,
		isDeferredPointerDownOutsideRef,
		dismissableSurfaces: context.dismissableSurfaces,
		shouldHandlePointerDownOutside: import_react.useCallback((target) => {
			if (!(target instanceof Node)) return false;
			const isPointerDownOnBranch = [...context.branches].some((branch) => branch.contains(target));
			return isPointerEventsEnabled && !isPointerDownOnBranch;
		}, [context.branches, isPointerEventsEnabled])
	});
	const focusOutside = useFocusOutside((event) => {
		if (deferPointerDownOutside && isDeferredPointerDownOutsideRef.current) return;
		const target = event.target;
		if ([...context.branches].some((branch) => branch.contains(target))) return;
		onFocusOutside?.(event);
		onInteractOutside?.(event);
		if (!event.defaultPrevented) onDismiss?.();
	}, ownerDocument);
	const isHighestLayer = node ? index === layers.length - 1 : false;
	const handleKeyDown = useCallbackRef$1((event) => {
		if (event.key !== "Escape") return;
		onEscapeKeyDown?.(event);
		if (!event.defaultPrevented && onDismiss) {
			event.preventDefault();
			onDismiss();
		}
	});
	import_react.useEffect(() => {
		if (!isHighestLayer) return;
		ownerDocument.addEventListener("keydown", handleKeyDown, { capture: true });
		return () => ownerDocument.removeEventListener("keydown", handleKeyDown, { capture: true });
	}, [
		ownerDocument,
		isHighestLayer,
		handleKeyDown
	]);
	import_react.useEffect(() => {
		if (!node) return;
		if (disableOutsidePointerEvents) {
			if (context.layersWithOutsidePointerEventsDisabled.size === 0) {
				originalBodyPointerEvents = ownerDocument.body.style.pointerEvents;
				ownerDocument.body.style.pointerEvents = "none";
			}
			context.layersWithOutsidePointerEventsDisabled.add(node);
		}
		context.layers.add(node);
		dispatchUpdate();
		return () => {
			if (disableOutsidePointerEvents) {
				context.layersWithOutsidePointerEventsDisabled.delete(node);
				if (context.layersWithOutsidePointerEventsDisabled.size === 0) ownerDocument.body.style.pointerEvents = originalBodyPointerEvents;
			}
		};
	}, [
		node,
		ownerDocument,
		disableOutsidePointerEvents,
		context
	]);
	import_react.useEffect(() => {
		return () => {
			if (!node) return;
			context.layers.delete(node);
			context.layersWithOutsidePointerEventsDisabled.delete(node);
			dispatchUpdate();
		};
	}, [node, context]);
	import_react.useEffect(() => {
		const handleUpdate = /* @__PURE__ */ __name$10(() => force({}), "handleUpdate");
		document.addEventListener(CONTEXT_UPDATE, handleUpdate);
		return () => document.removeEventListener(CONTEXT_UPDATE, handleUpdate);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		...layerProps,
		ref: composedRefs,
		style: {
			pointerEvents: isBodyPointerEventsDisabled ? isPointerEventsEnabled ? "auto" : "none" : void 0,
			...props.style
		},
		onFocusCapture: composeEventHandlers$1(props.onFocusCapture, focusOutside.onFocusCapture),
		onBlurCapture: composeEventHandlers$1(props.onBlurCapture, focusOutside.onBlurCapture),
		onPointerDownCapture: composeEventHandlers$1(props.onPointerDownCapture, pointerDownOutside.onPointerDownCapture)
	});
}, "DismissableLayer"));
function useDismissableLayerSurface() {
	const context = import_react.useContext(DismissableLayerContext);
	const [node, setNode] = import_react.useState(null);
	import_react.useEffect(() => {
		if (!node) return;
		context.dismissableSurfaces.add(node);
		return () => {
			context.dismissableSurfaces.delete(node);
		};
	}, [node, context.dismissableSurfaces]);
	return setNode;
}
__name$10(useDismissableLayerSurface, "useDismissableLayerSurface");
var IS_TRUE = /* @__PURE__ */ __name$10(() => true, "IS_TRUE");
function usePointerDownOutside(onPointerDownOutside, args) {
	const { ownerDocument = globalThis?.document, deferPointerDownOutside = false, isDeferredPointerDownOutsideRef, dismissableSurfaces, shouldHandlePointerDownOutside = IS_TRUE } = args;
	const handlePointerDownOutside = useCallbackRef$1(onPointerDownOutside);
	const isPointerInsideReactTreeRef = import_react.useRef(false);
	const isPointerDownOutsideRef = import_react.useRef(false);
	const interceptedOutsideInteractionEventsRef = import_react.useRef(/* @__PURE__ */ new Map());
	const handleClickRef = import_react.useRef(() => {});
	import_react.useEffect(() => {
		function resetOutsideInteraction() {
			isPointerDownOutsideRef.current = false;
			isDeferredPointerDownOutsideRef.current = false;
			interceptedOutsideInteractionEventsRef.current.clear();
		}
		__name$10(resetOutsideInteraction, "resetOutsideInteraction");
		function isOutsideInteractionIntercepted() {
			return Array.from(interceptedOutsideInteractionEventsRef.current.values()).some(Boolean);
		}
		__name$10(isOutsideInteractionIntercepted, "isOutsideInteractionIntercepted");
		function handleInteractionCapture(event) {
			if (!isPointerDownOutsideRef.current) return;
			const target = event.target;
			if (!(target instanceof Node && [...dismissableSurfaces].some((surface) => surface.contains(target)))) interceptedOutsideInteractionEventsRef.current.set(event.type, true);
			if (event.type === "click") window.setTimeout(() => {
				if (isPointerDownOutsideRef.current) handleClickRef.current();
			}, 0);
		}
		__name$10(handleInteractionCapture, "handleInteractionCapture");
		function handleInteractionBubble(event) {
			if (isPointerDownOutsideRef.current) interceptedOutsideInteractionEventsRef.current.set(event.type, false);
		}
		__name$10(handleInteractionBubble, "handleInteractionBubble");
		const handlePointerDown = /* @__PURE__ */ __name$10((event) => {
			if (event.target && !isPointerInsideReactTreeRef.current) {
				let handleAndDispatchPointerDownOutsideEvent2 = function() {
					ownerDocument.removeEventListener("click", handleClickRef.current);
					const wasOutsideInteractionIntercepted = isOutsideInteractionIntercepted();
					resetOutsideInteraction();
					if (!wasOutsideInteractionIntercepted) handleAndDispatchCustomEvent(POINTER_DOWN_OUTSIDE, handlePointerDownOutside, eventDetail, { discrete: true });
				};
				__name$10(handleAndDispatchPointerDownOutsideEvent2, "handleAndDispatchPointerDownOutsideEvent");
				if (!shouldHandlePointerDownOutside(event.target)) {
					ownerDocument.removeEventListener("click", handleClickRef.current);
					resetOutsideInteraction();
					isPointerInsideReactTreeRef.current = false;
					return;
				}
				const eventDetail = { originalEvent: event };
				isPointerDownOutsideRef.current = true;
				isDeferredPointerDownOutsideRef.current = deferPointerDownOutside && event.button === 0;
				interceptedOutsideInteractionEventsRef.current.clear();
				if (!deferPointerDownOutside || event.button !== 0) handleAndDispatchPointerDownOutsideEvent2();
				else {
					ownerDocument.removeEventListener("click", handleClickRef.current);
					handleClickRef.current = handleAndDispatchPointerDownOutsideEvent2;
					ownerDocument.addEventListener("click", handleClickRef.current, { once: true });
				}
			} else {
				ownerDocument.removeEventListener("click", handleClickRef.current);
				resetOutsideInteraction();
			}
			isPointerInsideReactTreeRef.current = false;
		}, "handlePointerDown");
		const outsideInteractionEvents = [
			"pointerup",
			"mousedown",
			"mouseup",
			"touchstart",
			"touchend",
			"click"
		];
		for (const eventName of outsideInteractionEvents) {
			ownerDocument.addEventListener(eventName, handleInteractionCapture, true);
			ownerDocument.addEventListener(eventName, handleInteractionBubble);
		}
		const timerId = window.setTimeout(() => {
			ownerDocument.addEventListener("pointerdown", handlePointerDown);
		}, 0);
		return () => {
			window.clearTimeout(timerId);
			ownerDocument.removeEventListener("pointerdown", handlePointerDown);
			ownerDocument.removeEventListener("click", handleClickRef.current);
			for (const eventName of outsideInteractionEvents) {
				ownerDocument.removeEventListener(eventName, handleInteractionCapture, true);
				ownerDocument.removeEventListener(eventName, handleInteractionBubble);
			}
		};
	}, [
		ownerDocument,
		handlePointerDownOutside,
		deferPointerDownOutside,
		isDeferredPointerDownOutsideRef,
		dismissableSurfaces,
		shouldHandlePointerDownOutside
	]);
	return { onPointerDownCapture: /* @__PURE__ */ __name$10(() => isPointerInsideReactTreeRef.current = true, "onPointerDownCapture") };
}
__name$10(usePointerDownOutside, "usePointerDownOutside");
function useFocusOutside(onFocusOutside, ownerDocument = globalThis?.document) {
	const handleFocusOutside = useCallbackRef$1(onFocusOutside);
	const isFocusInsideReactTreeRef = import_react.useRef(false);
	import_react.useEffect(() => {
		const handleFocus = /* @__PURE__ */ __name$10((event) => {
			if (event.target && !isFocusInsideReactTreeRef.current) handleAndDispatchCustomEvent(FOCUS_OUTSIDE, handleFocusOutside, { originalEvent: event }, { discrete: false });
		}, "handleFocus");
		ownerDocument.addEventListener("focusin", handleFocus);
		return () => ownerDocument.removeEventListener("focusin", handleFocus);
	}, [ownerDocument, handleFocusOutside]);
	return {
		onFocusCapture: /* @__PURE__ */ __name$10(() => isFocusInsideReactTreeRef.current = true, "onFocusCapture"),
		onBlurCapture: /* @__PURE__ */ __name$10(() => isFocusInsideReactTreeRef.current = false, "onBlurCapture")
	};
}
__name$10(useFocusOutside, "useFocusOutside");
function dispatchUpdate() {
	const event = new CustomEvent(CONTEXT_UPDATE);
	document.dispatchEvent(event);
}
__name$10(dispatchUpdate, "dispatchUpdate");
function handleAndDispatchCustomEvent(name, handler, detail, { discrete }) {
	const target = detail.originalEvent.target;
	const event = new CustomEvent(name, {
		bubbles: false,
		cancelable: true,
		detail
	});
	if (handler) target.addEventListener(name, handler, { once: true });
	if (discrete) dispatchDiscreteCustomEvent(target, event);
	else target.dispatchEvent(event);
}
__name$10(handleAndDispatchCustomEvent, "handleAndDispatchCustomEvent");
//#endregion
//#region node_modules/@radix-ui/react-focus-scope/dist/index.mjs
var __defProp$9 = Object.defineProperty;
var __name$9 = (target, value) => __defProp$9(target, "name", {
	value,
	configurable: true
});
var AUTOFOCUS_ON_MOUNT = "focusScope.autoFocusOnMount";
var AUTOFOCUS_ON_UNMOUNT = "focusScope.autoFocusOnUnmount";
var EVENT_OPTIONS = {
	bubbles: false,
	cancelable: true
};
var FocusScope = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$9(function FocusScope2(props, forwardedRef) {
	const { loop = false, trapped = false, branches, onMountAutoFocus: onMountAutoFocusProp, onUnmountAutoFocus: onUnmountAutoFocusProp, ...scopeProps } = props;
	const [container, setContainer] = import_react.useState(null);
	const onMountAutoFocus = useCallbackRef$1(onMountAutoFocusProp);
	const onUnmountAutoFocus = useCallbackRef$1(onUnmountAutoFocusProp);
	const lastFocusedElementRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, setContainer);
	const branchesRef = import_react.useRef(branches);
	import_react.useEffect(() => {
		branchesRef.current = branches;
	});
	const isTargetInScope = import_react.useCallback((target) => {
		if (!target) return false;
		if (container?.contains(target)) return true;
		return Boolean(branchesRef.current?.some((branch) => branch.contains(target)));
	}, [container]);
	const focusScope = import_react.useRef({
		paused: false,
		pause() {
			this.paused = true;
		},
		resume() {
			this.paused = false;
		}
	}).current;
	import_react.useEffect(() => {
		if (trapped) {
			let handleFocusIn2 = function(event) {
				if (focusScope.paused || !container) return;
				const target = event.target;
				if (isTargetInScope(target)) lastFocusedElementRef.current = target;
				else focus(lastFocusedElementRef.current, { select: true });
			}, handleFocusOut2 = function(event) {
				if (focusScope.paused || !container) return;
				const relatedTarget = event.relatedTarget;
				if (relatedTarget === null) return;
				if (!isTargetInScope(relatedTarget)) focus(lastFocusedElementRef.current, { select: true });
			}, handleMutations2 = function(mutations) {
				if (document.activeElement !== document.body) return;
				for (const mutation of mutations) if (mutation.removedNodes.length > 0) focus(container);
			};
			__name$9(handleFocusIn2, "handleFocusIn");
			__name$9(handleFocusOut2, "handleFocusOut");
			__name$9(handleMutations2, "handleMutations");
			document.addEventListener("focusin", handleFocusIn2);
			document.addEventListener("focusout", handleFocusOut2);
			const mutationObserver = new MutationObserver(handleMutations2);
			if (container) mutationObserver.observe(container, {
				childList: true,
				subtree: true
			});
			return () => {
				document.removeEventListener("focusin", handleFocusIn2);
				document.removeEventListener("focusout", handleFocusOut2);
				mutationObserver.disconnect();
			};
		}
	}, [
		trapped,
		container,
		focusScope.paused,
		isTargetInScope
	]);
	import_react.useEffect(() => {
		if (container) {
			focusScopesStack.add(focusScope);
			const previouslyFocusedElement = document.activeElement;
			if (!container.contains(previouslyFocusedElement)) {
				const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
				container.addEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
				container.dispatchEvent(mountEvent);
				if (!mountEvent.defaultPrevented) {
					focusFirst(removeLinks(getTabbableCandidates(container)), { select: true });
					if (document.activeElement === previouslyFocusedElement) focus(container);
				}
			}
			return () => {
				container.removeEventListener(AUTOFOCUS_ON_MOUNT, onMountAutoFocus);
				setTimeout(() => {
					const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
					container.addEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
					container.dispatchEvent(unmountEvent);
					if (!unmountEvent.defaultPrevented) focus(previouslyFocusedElement ?? document.body, { select: true });
					container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, onUnmountAutoFocus);
					focusScopesStack.remove(focusScope);
				}, 0);
			};
		}
	}, [
		container,
		onMountAutoFocus,
		onUnmountAutoFocus,
		focusScope
	]);
	const handleKeyDown = import_react.useCallback((event) => {
		if (!loop && !trapped) return;
		if (focusScope.paused) return;
		const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
		const focusedElement = document.activeElement;
		if (isTabKey && focusedElement) {
			const container2 = event.currentTarget;
			const [first, last] = getTabbableEdges(container2);
			if (!(first && last)) {
				if (focusedElement === container2) event.preventDefault();
			} else if (!event.shiftKey && focusedElement === last) {
				event.preventDefault();
				if (loop) focus(first, { select: true });
			} else if (event.shiftKey && focusedElement === first) {
				event.preventDefault();
				if (loop) focus(last, { select: true });
			}
		}
	}, [
		loop,
		trapped,
		focusScope.paused
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		tabIndex: -1,
		...scopeProps,
		ref: composedRefs,
		onKeyDown: handleKeyDown
	});
}, "FocusScope"));
var FocusScopeBranchContext = import_react.createContext(null);
function FocusScopeBranchProvider({ registry, children }) {
	if (!registry) return children;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScopeBranchContext.Provider, {
		value: registry,
		children
	});
}
__name$9(FocusScopeBranchProvider, "FocusScopeBranchProvider");
function useFocusScopeBranchRegistry() {
	const [nodes, setNodes] = import_react.useState([]);
	return {
		nodes,
		registry: import_react.useMemo(() => ({
			add: /* @__PURE__ */ __name$9((node) => setNodes((prev) => prev.includes(node) ? prev : [...prev, node]), "add"),
			remove: /* @__PURE__ */ __name$9((node) => setNodes((prev) => prev.filter((current) => current !== node)), "remove")
		}), [])
	};
}
__name$9(useFocusScopeBranchRegistry, "useFocusScopeBranchRegistry");
function useFocusScopeBranch(node) {
	const registry = import_react.useContext(FocusScopeBranchContext);
	import_react.useEffect(() => {
		if (!node || !registry) return;
		registry.add(node);
		return () => registry.remove(node);
	}, [node, registry]);
}
__name$9(useFocusScopeBranch, "useFocusScopeBranch");
function focusFirst(candidates, { select = false } = {}) {
	const previouslyFocusedElement = document.activeElement;
	for (const candidate of candidates) {
		focus(candidate, { select });
		if (document.activeElement !== previouslyFocusedElement) return;
	}
}
__name$9(focusFirst, "focusFirst");
function getTabbableEdges(container) {
	const candidates = getTabbableCandidates(container);
	return [findVisible(candidates, container), findVisible(candidates.reverse(), container)];
}
__name$9(getTabbableEdges, "getTabbableEdges");
function getTabbableCandidates(container) {
	const nodes = [];
	const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, { acceptNode: /* @__PURE__ */ __name$9((node) => {
		const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
		if (node.disabled || node.hidden || isHiddenInput) return NodeFilter.FILTER_SKIP;
		return node.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
	}, "acceptNode") });
	while (walker.nextNode()) nodes.push(walker.currentNode);
	return nodes;
}
__name$9(getTabbableCandidates, "getTabbableCandidates");
function findVisible(elements, container) {
	const canUseCheckVisibility = typeof container.checkVisibility === "function" && container.checkVisibility({ checkVisibilityCSS: true });
	for (const element of elements) if (!(canUseCheckVisibility ? !element.checkVisibility({ checkVisibilityCSS: true }) : isHidden(element, { upTo: container }))) return element;
}
__name$9(findVisible, "findVisible");
function isHidden(node, { upTo }) {
	if (getComputedStyle(node).visibility === "hidden") return true;
	while (node) {
		if (upTo !== void 0 && node === upTo) return false;
		if (getComputedStyle(node).display === "none") return true;
		node = node.parentElement;
	}
	return false;
}
__name$9(isHidden, "isHidden");
function isSelectableInput(element) {
	return element instanceof HTMLInputElement && "select" in element;
}
__name$9(isSelectableInput, "isSelectableInput");
function focus(element, { select = false } = {}) {
	if (element && element.focus) {
		const previouslyFocusedElement = document.activeElement;
		element.focus({ preventScroll: true });
		if (element !== previouslyFocusedElement && isSelectableInput(element) && select) element.select();
	}
}
__name$9(focus, "focus");
var focusScopesStack = createFocusScopesStack();
function createFocusScopesStack() {
	let stack = [];
	return {
		add(focusScope) {
			const activeFocusScope = stack[0];
			if (focusScope !== activeFocusScope) activeFocusScope?.pause();
			stack = arrayRemove(stack, focusScope);
			stack.unshift(focusScope);
		},
		remove(focusScope) {
			stack = arrayRemove(stack, focusScope);
			stack[0]?.resume();
		}
	};
}
__name$9(createFocusScopesStack, "createFocusScopesStack");
function arrayRemove(array, item) {
	const updatedArray = [...array];
	const index = updatedArray.indexOf(item);
	if (index !== -1) updatedArray.splice(index, 1);
	return updatedArray;
}
__name$9(arrayRemove, "arrayRemove");
function removeLinks(items) {
	return items.filter((item) => item.tagName !== "A");
}
__name$9(removeLinks, "removeLinks");
//#endregion
//#region node_modules/@radix-ui/react-portal/dist/index.mjs
var __defProp$8 = Object.defineProperty;
var __name$8 = (target, value) => __defProp$8(target, "name", {
	value,
	configurable: true
});
var Portal$1 = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$8(function Portal2(props, forwardedRef) {
	const { container: containerProp, ...portalProps } = props;
	const [mounted, setMounted] = import_react.useState(false);
	useLayoutEffect2(() => setMounted(true), []);
	const container = containerProp || mounted && globalThis?.document?.body;
	return container ? import_react_dom.createPortal(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		...portalProps,
		ref: forwardedRef
	}), container) : null;
}, "Portal"));
//#endregion
//#region node_modules/@radix-ui/react-focus-guards/dist/index.mjs
var __defProp$7 = Object.defineProperty;
var __name$7 = (target, value) => __defProp$7(target, "name", {
	value,
	configurable: true
});
var count = 0;
var guards = null;
function FocusGuards(props) {
	useFocusGuards();
	return props.children;
}
__name$7(FocusGuards, "FocusGuards");
function useFocusGuards() {
	import_react.useEffect(() => {
		if (!guards) guards = {
			start: createFocusGuard(),
			end: createFocusGuard()
		};
		const { start, end } = guards;
		if (document.body.firstElementChild !== start) document.body.insertAdjacentElement("afterbegin", start);
		if (document.body.lastElementChild !== end) document.body.insertAdjacentElement("beforeend", end);
		count++;
		return () => {
			if (count === 1) {
				guards?.start.remove();
				guards?.end.remove();
				guards = null;
			}
			count = Math.max(0, count - 1);
		};
	}, []);
}
__name$7(useFocusGuards, "useFocusGuards");
function createFocusGuard() {
	const element = document.createElement("span");
	element.setAttribute("data-radix-focus-guard", "");
	element.tabIndex = 0;
	element.style.outline = "none";
	element.style.opacity = "0";
	element.style.position = "fixed";
	element.style.pointerEvents = "none";
	return element;
}
__name$7(createFocusGuard, "createFocusGuard");
//#endregion
//#region node_modules/tslib/tslib.es6.mjs
var __assign = function() {
	__assign = Object.assign || function __assign(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign.apply(this, arguments);
};
function __rest(s, e) {
	var t = {};
	for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
	if (s != null && typeof Object.getOwnPropertySymbols === "function") {
		for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
	}
	return t;
}
function __awaiter(thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P ? value : new P(function(resolve) {
			resolve(value);
		});
	}
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
}
function __generator(thisArg, body) {
	var _ = {
		label: 0,
		sent: function() {
			if (t[0] & 1) throw t[1];
			return t[1];
		},
		trys: [],
		ops: []
	}, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
	return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
		return this;
	}), g;
	function verb(n) {
		return function(v) {
			return step([n, v]);
		};
	}
	function step(op) {
		if (f) throw new TypeError("Generator is already executing.");
		while (g && (g = 0, op[0] && (_ = 0)), _) try {
			if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
			if (y = 0, t) op = [op[0] & 2, t.value];
			switch (op[0]) {
				case 0:
				case 1:
					t = op;
					break;
				case 4:
					_.label++;
					return {
						value: op[1],
						done: false
					};
				case 5:
					_.label++;
					y = op[1];
					op = [0];
					continue;
				case 7:
					op = _.ops.pop();
					_.trys.pop();
					continue;
				default:
					if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
						_ = 0;
						continue;
					}
					if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
						_.label = op[1];
						break;
					}
					if (op[0] === 6 && _.label < t[1]) {
						_.label = t[1];
						t = op;
						break;
					}
					if (t && _.label < t[2]) {
						_.label = t[2];
						_.ops.push(op);
						break;
					}
					if (t[2]) _.ops.pop();
					_.trys.pop();
					continue;
			}
			op = body.call(thisArg, _);
		} catch (e) {
			op = [6, e];
			y = 0;
		} finally {
			f = t = 0;
		}
		if (op[0] & 5) throw op[1];
		return {
			value: op[0] ? op[1] : void 0,
			done: true
		};
	}
}
function __read(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
}
/** @deprecated */
function __spread() {
	for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
	return ar;
}
function __spreadArray(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
}
//#endregion
//#region node_modules/react-remove-scroll-bar/dist/es2015/constants.js
var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
/**
* Name of a CSS variable containing the amount of "hidden" scrollbar
* ! might be undefined ! use will fallback!
*/
var removedBarSizeVariable = "--removed-body-scroll-bar-size";
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/assignRef.js
/**
* Assigns a value for a given ref, no matter of the ref format
* @param {RefObject} ref - a callback function or ref object
* @param value - a new value
*
* @see https://github.com/theKashey/use-callback-ref#assignref
* @example
* const refObject = useRef();
* const refFn = (ref) => {....}
*
* assignRef(refObject, "refValue");
* assignRef(refFn, "refValue");
*/
function assignRef(ref, value) {
	if (typeof ref === "function") ref(value);
	else if (ref) ref.current = value;
	return ref;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useRef.js
/**
* creates a MutableRef with ref change callback
* @param initialValue - initial ref value
* @param {Function} callback - a callback to run when value changes
*
* @example
* const ref = useCallbackRef(0, (newValue, oldValue) => console.log(oldValue, '->', newValue);
* ref.current = 1;
* // prints 0 -> 1
*
* @see https://reactjs.org/docs/hooks-reference.html#useref
* @see https://github.com/theKashey/use-callback-ref#usecallbackref---to-replace-reactuseref
* @returns {MutableRefObject}
*/
function useCallbackRef(initialValue, callback) {
	var ref = (0, import_react.useState)(function() {
		return {
			value: initialValue,
			callback,
			facade: {
				get current() {
					return ref.value;
				},
				set current(value) {
					var last = ref.value;
					if (last !== value) {
						ref.value = value;
						ref.callback(value, last);
					}
				}
			}
		};
	})[0];
	ref.callback = callback;
	return ref.facade;
}
//#endregion
//#region node_modules/use-callback-ref/dist/es2015/useMergeRef.js
var useIsomorphicLayoutEffect$1 = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
var currentValues = /* @__PURE__ */ new WeakMap();
/**
* Merges two or more refs together providing a single interface to set their value
* @param {RefObject|Ref} refs
* @returns {MutableRefObject} - a new ref, which translates all changes to {refs}
*
* @see {@link mergeRefs} a version without buit-in memoization
* @see https://github.com/theKashey/use-callback-ref#usemergerefs
* @example
* const Component = React.forwardRef((props, ref) => {
*   const ownRef = useRef();
*   const domRef = useMergeRefs([ref, ownRef]); // 👈 merge together
*   return <div ref={domRef}>...</div>
* }
*/
function useMergeRefs(refs, defaultValue) {
	var callbackRef = useCallbackRef(defaultValue || null, function(newValue) {
		return refs.forEach(function(ref) {
			return assignRef(ref, newValue);
		});
	});
	useIsomorphicLayoutEffect$1(function() {
		var oldValue = currentValues.get(callbackRef);
		if (oldValue) {
			var prevRefs_1 = new Set(oldValue);
			var nextRefs_1 = new Set(refs);
			var current_1 = callbackRef.current;
			prevRefs_1.forEach(function(ref) {
				if (!nextRefs_1.has(ref)) assignRef(ref, null);
			});
			nextRefs_1.forEach(function(ref) {
				if (!prevRefs_1.has(ref)) assignRef(ref, current_1);
			});
		}
		currentValues.set(callbackRef, refs);
	}, [refs]);
	return callbackRef;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/medium.js
function ItoI(a) {
	return a;
}
function innerCreateMedium(defaults, middleware) {
	if (middleware === void 0) middleware = ItoI;
	var buffer = [];
	var assigned = false;
	return {
		read: function() {
			if (assigned) throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
			if (buffer.length) return buffer[buffer.length - 1];
			return defaults;
		},
		useMedium: function(data) {
			var item = middleware(data, assigned);
			buffer.push(item);
			return function() {
				buffer = buffer.filter(function(x) {
					return x !== item;
				});
			};
		},
		assignSyncMedium: function(cb) {
			assigned = true;
			while (buffer.length) {
				var cbs = buffer;
				buffer = [];
				cbs.forEach(cb);
			}
			buffer = {
				push: function(x) {
					return cb(x);
				},
				filter: function() {
					return buffer;
				}
			};
		},
		assignMedium: function(cb) {
			assigned = true;
			var pendingQueue = [];
			if (buffer.length) {
				var cbs = buffer;
				buffer = [];
				cbs.forEach(cb);
				pendingQueue = buffer;
			}
			var executeQueue = function() {
				var cbs = pendingQueue;
				pendingQueue = [];
				cbs.forEach(cb);
			};
			var cycle = function() {
				return Promise.resolve().then(executeQueue);
			};
			cycle();
			buffer = {
				push: function(x) {
					pendingQueue.push(x);
					cycle();
				},
				filter: function(filter) {
					pendingQueue = pendingQueue.filter(filter);
					return buffer;
				}
			};
		}
	};
}
function createSidecarMedium(options) {
	if (options === void 0) options = {};
	var medium = innerCreateMedium(null);
	medium.options = __assign({
		async: true,
		ssr: false
	}, options);
	return medium;
}
//#endregion
//#region node_modules/use-sidecar/dist/es2015/exports.js
var SideCar = function(_a) {
	var sideCar = _a.sideCar, rest = __rest(_a, ["sideCar"]);
	if (!sideCar) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
	var Target = sideCar.read();
	if (!Target) throw new Error("Sidecar medium not found");
	return import_react.createElement(Target, __assign({}, rest));
};
SideCar.isSideCarExport = true;
function exportSidecar(medium, exported) {
	medium.useMedium(exported);
	return SideCar;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/medium.js
var effectCar = createSidecarMedium();
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/UI.js
var nothing = function() {};
/**
* Removes scrollbar from the page and contain the scroll within the Lock
*/
var RemoveScroll = import_react.forwardRef(function(props, parentRef) {
	var ref = import_react.useRef(null);
	var _a = import_react.useState({
		onScrollCapture: nothing,
		onWheelCapture: nothing,
		onTouchMoveCapture: nothing
	}), callbacks = _a[0], setCallbacks = _a[1];
	var forwardProps = props.forwardProps, children = props.children, className = props.className, removeScrollBar = props.removeScrollBar, enabled = props.enabled, shards = props.shards, sideCar = props.sideCar, noRelative = props.noRelative, noIsolation = props.noIsolation, inert = props.inert, allowPinchZoom = props.allowPinchZoom, _b = props.as, Container = _b === void 0 ? "div" : _b, gapMode = props.gapMode, rest = __rest(props, [
		"forwardProps",
		"children",
		"className",
		"removeScrollBar",
		"enabled",
		"shards",
		"sideCar",
		"noRelative",
		"noIsolation",
		"inert",
		"allowPinchZoom",
		"as",
		"gapMode"
	]);
	var SideCar = sideCar;
	var containerRef = useMergeRefs([ref, parentRef]);
	var containerProps = __assign(__assign({}, rest), callbacks);
	return import_react.createElement(import_react.Fragment, null, enabled && import_react.createElement(SideCar, {
		sideCar: effectCar,
		removeScrollBar,
		shards,
		noRelative,
		noIsolation,
		inert,
		setCallbacks,
		allowPinchZoom: !!allowPinchZoom,
		lockRef: ref,
		gapMode
	}), forwardProps ? import_react.cloneElement(import_react.Children.only(children), __assign(__assign({}, containerProps), { ref: containerRef })) : import_react.createElement(Container, __assign({}, containerProps, {
		className,
		ref: containerRef
	}), children));
});
RemoveScroll.defaultProps = {
	enabled: true,
	removeScrollBar: true,
	inert: false
};
RemoveScroll.classNames = {
	fullWidth: fullWidthClassName,
	zeroRight: zeroRightClassName
};
var getNonce = function() {
	if (typeof __webpack_nonce__ !== "undefined") return __webpack_nonce__;
};
//#endregion
//#region node_modules/react-style-singleton/dist/es2015/singleton.js
function makeStyleTag() {
	if (!document) return null;
	var tag = document.createElement("style");
	tag.type = "text/css";
	var nonce = getNonce();
	if (nonce) tag.setAttribute("nonce", nonce);
	return tag;
}
function injectStyles(tag, css) {
	if (tag.styleSheet) tag.styleSheet.cssText = css;
	else tag.appendChild(document.createTextNode(css));
}
function insertStyleTag(tag) {
	(document.head || document.getElementsByTagName("head")[0]).appendChild(tag);
}
var stylesheetSingleton = function() {
	var counter = 0;
	var stylesheet = null;
	return {
		add: function(style) {
			if (counter == 0) {
				if (stylesheet = makeStyleTag()) {
					injectStyles(stylesheet, style);
					insertStyleTag(stylesheet);
				}
			}
			counter++;
		},
		remove: function() {
			counter--;
			if (!counter && stylesheet) {
				stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
				stylesheet = null;
			}
		}
	};
};
//#endregion
//#region node_modules/react-style-singleton/dist/es2015/hook.js
/**
* creates a hook to control style singleton
* @see {@link styleSingleton} for a safer component version
* @example
* ```tsx
* const useStyle = styleHookSingleton();
* ///
* useStyle('body { overflow: hidden}');
*/
var styleHookSingleton = function() {
	var sheet = stylesheetSingleton();
	return function(styles, isDynamic) {
		import_react.useEffect(function() {
			sheet.add(styles);
			return function() {
				sheet.remove();
			};
		}, [styles && isDynamic]);
	};
};
//#endregion
//#region node_modules/react-style-singleton/dist/es2015/component.js
/**
* create a Component to add styles on demand
* - styles are added when first instance is mounted
* - styles are removed when the last instance is unmounted
* - changing styles in runtime does nothing unless dynamic is set. But with multiple components that can lead to the undefined behavior
*/
var styleSingleton = function() {
	var useStyle = styleHookSingleton();
	var Sheet = function(_a) {
		var styles = _a.styles, dynamic = _a.dynamic;
		useStyle(styles, dynamic);
		return null;
	};
	return Sheet;
};
//#endregion
//#region node_modules/react-remove-scroll-bar/dist/es2015/utils.js
var zeroGap = {
	left: 0,
	top: 0,
	right: 0,
	gap: 0
};
var parse$2 = function(x) {
	return parseInt(x || "", 10) || 0;
};
var getOffset = function(gapMode) {
	var cs = window.getComputedStyle(document.body);
	var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
	var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
	var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
	return [
		parse$2(left),
		parse$2(top),
		parse$2(right)
	];
};
var getGapWidth = function(gapMode) {
	if (gapMode === void 0) gapMode = "margin";
	if (typeof window === "undefined") return zeroGap;
	var offsets = getOffset(gapMode);
	var documentWidth = document.documentElement.clientWidth;
	var windowWidth = window.innerWidth;
	return {
		left: offsets[0],
		top: offsets[1],
		right: offsets[2],
		gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0])
	};
};
//#endregion
//#region node_modules/react-remove-scroll-bar/dist/es2015/component.js
var Style = styleSingleton();
var lockAttribute = "data-scroll-locked";
var getStyles = function(_a, allowRelative, gapMode, important) {
	var left = _a.left, top = _a.top, right = _a.right, gap = _a.gap;
	if (gapMode === void 0) gapMode = "margin";
	return "\n  .".concat(noScrollbarsClassName, " {\n   overflow: hidden ").concat(important, ";\n   padding-right: ").concat(gap, "px ").concat(important, ";\n  }\n  body[").concat(lockAttribute, "] {\n    overflow: hidden ").concat(important, ";\n    overscroll-behavior: contain;\n    ").concat([
		allowRelative && "position: relative ".concat(important, ";"),
		gapMode === "margin" && "\n    padding-left: ".concat(left, "px;\n    padding-top: ").concat(top, "px;\n    padding-right: ").concat(right, "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: ").concat(gap, "px ").concat(important, ";\n    "),
		gapMode === "padding" && "padding-right: ".concat(gap, "px ").concat(important, ";")
	].filter(Boolean).join(""), "\n  }\n  \n  .").concat(zeroRightClassName, " {\n    right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " {\n    margin-right: ").concat(gap, "px ").concat(important, ";\n  }\n  \n  .").concat(zeroRightClassName, " .").concat(zeroRightClassName, " {\n    right: 0 ").concat(important, ";\n  }\n  \n  .").concat(fullWidthClassName, " .").concat(fullWidthClassName, " {\n    margin-right: 0 ").concat(important, ";\n  }\n  \n  body[").concat(lockAttribute, "] {\n    ").concat(removedBarSizeVariable, ": ").concat(gap, "px;\n  }\n");
};
var getCurrentUseCounter = function() {
	var counter = parseInt(document.body.getAttribute("data-scroll-locked") || "0", 10);
	return isFinite(counter) ? counter : 0;
};
var useLockAttribute = function() {
	import_react.useEffect(function() {
		document.body.setAttribute(lockAttribute, (getCurrentUseCounter() + 1).toString());
		return function() {
			var newCounter = getCurrentUseCounter() - 1;
			if (newCounter <= 0) document.body.removeAttribute(lockAttribute);
			else document.body.setAttribute(lockAttribute, newCounter.toString());
		};
	}, []);
};
/**
* Removes page scrollbar and blocks page scroll when mounted
*/
var RemoveScrollBar = function(_a) {
	var noRelative = _a.noRelative, noImportant = _a.noImportant, _b = _a.gapMode, gapMode = _b === void 0 ? "margin" : _b;
	useLockAttribute();
	var gap = import_react.useMemo(function() {
		return getGapWidth(gapMode);
	}, [gapMode]);
	return import_react.createElement(Style, { styles: getStyles(gap, !noRelative, gapMode, !noImportant ? "!important" : "") });
};
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/aggresiveCapture.js
var passiveSupported = false;
if (typeof window !== "undefined") try {
	var options = Object.defineProperty({}, "passive", { get: function() {
		passiveSupported = true;
		return true;
	} });
	window.addEventListener("test", options, options);
	window.removeEventListener("test", options, options);
} catch (err) {
	passiveSupported = false;
}
var nonPassive = passiveSupported ? { passive: false } : false;
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/handleScroll.js
var alwaysContainsScroll = function(node) {
	return node.tagName === "TEXTAREA";
};
var elementCanBeScrolled = function(node, overflow) {
	if (!(node instanceof Element)) return false;
	var styles = window.getComputedStyle(node);
	return styles[overflow] !== "hidden" && !(styles.overflowY === styles.overflowX && !alwaysContainsScroll(node) && styles[overflow] === "visible");
};
var elementCouldBeVScrolled = function(node) {
	return elementCanBeScrolled(node, "overflowY");
};
var elementCouldBeHScrolled = function(node) {
	return elementCanBeScrolled(node, "overflowX");
};
var locationCouldBeScrolled = function(axis, node) {
	var ownerDocument = node.ownerDocument;
	var current = node;
	do {
		if (typeof ShadowRoot !== "undefined" && current instanceof ShadowRoot) current = current.host;
		if (elementCouldBeScrolled(axis, current)) {
			var _a = getScrollVariables(axis, current);
			if (_a[1] > _a[2]) return true;
		}
		current = current.parentNode;
	} while (current && current !== ownerDocument.body);
	return false;
};
var getVScrollVariables = function(_a) {
	return [
		_a.scrollTop,
		_a.scrollHeight,
		_a.clientHeight
	];
};
var getHScrollVariables = function(_a) {
	return [
		_a.scrollLeft,
		_a.scrollWidth,
		_a.clientWidth
	];
};
var elementCouldBeScrolled = function(axis, node) {
	return axis === "v" ? elementCouldBeVScrolled(node) : elementCouldBeHScrolled(node);
};
var getScrollVariables = function(axis, node) {
	return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var getDirectionFactor = function(axis, direction) {
	/**
	* If the element's direction is rtl (right-to-left), then scrollLeft is 0 when the scrollbar is at its rightmost position,
	* and then increasingly negative as you scroll towards the end of the content.
	* @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollLeft
	*/
	return axis === "h" && direction === "rtl" ? -1 : 1;
};
var handleScroll = function(axis, endTarget, event, sourceDelta, noOverscroll) {
	var directionFactor = getDirectionFactor(axis, window.getComputedStyle(endTarget).direction);
	var delta = directionFactor * sourceDelta;
	var target = event.target;
	var targetInLock = endTarget.contains(target);
	var shouldCancelScroll = false;
	var isDeltaPositive = delta > 0;
	var availableScroll = 0;
	var availableScrollTop = 0;
	do {
		if (!target) break;
		var _a = getScrollVariables(axis, target), position = _a[0];
		var elementScroll = _a[1] - _a[2] - directionFactor * position;
		if (position || elementScroll) {
			if (elementCouldBeScrolled(axis, target)) {
				availableScroll += elementScroll;
				availableScrollTop += position;
			}
		}
		var parent_1 = target.parentNode;
		target = parent_1 && parent_1.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? parent_1.host : parent_1;
	} while (!targetInLock && target !== document.body || targetInLock && (endTarget.contains(target) || endTarget === target));
	if (isDeltaPositive && (noOverscroll && Math.abs(availableScroll) < 1 || !noOverscroll && delta > availableScroll)) shouldCancelScroll = true;
	else if (!isDeltaPositive && (noOverscroll && Math.abs(availableScrollTop) < 1 || !noOverscroll && -delta > availableScrollTop)) shouldCancelScroll = true;
	return shouldCancelScroll;
};
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/SideEffect.js
var getTouchXY = function(event) {
	return "changedTouches" in event ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY] : [0, 0];
};
var getDeltaXY = function(event) {
	return [event.deltaX, event.deltaY];
};
var extractRef = function(ref) {
	return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function(x, y) {
	return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function(id) {
	return "\n  .block-interactivity-".concat(id, " {pointer-events: none;}\n  .allow-interactivity-").concat(id, " {pointer-events: all;}\n");
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
	var shouldPreventQueue = import_react.useRef([]);
	var touchStartRef = import_react.useRef([0, 0]);
	var activeAxis = import_react.useRef();
	var id = import_react.useState(idCounter++)[0];
	var Style = import_react.useState(styleSingleton)[0];
	var lastProps = import_react.useRef(props);
	import_react.useEffect(function() {
		lastProps.current = props;
	}, [props]);
	import_react.useEffect(function() {
		if (props.inert) {
			document.body.classList.add("block-interactivity-".concat(id));
			var allow_1 = __spreadArray([props.lockRef.current], (props.shards || []).map(extractRef), true).filter(Boolean);
			allow_1.forEach(function(el) {
				return el.classList.add("allow-interactivity-".concat(id));
			});
			return function() {
				document.body.classList.remove("block-interactivity-".concat(id));
				allow_1.forEach(function(el) {
					return el.classList.remove("allow-interactivity-".concat(id));
				});
			};
		}
	}, [
		props.inert,
		props.lockRef.current,
		props.shards
	]);
	var shouldCancelEvent = import_react.useCallback(function(event, parent) {
		if ("touches" in event && event.touches.length === 2 || event.type === "wheel" && event.ctrlKey) return !lastProps.current.allowPinchZoom;
		var touch = getTouchXY(event);
		var touchStart = touchStartRef.current;
		var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
		var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
		var currentAxis;
		var target = event.target;
		var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
		if ("touches" in event && moveDirection === "h" && target.type === "range") return false;
		var selection = window.getSelection();
		var anchorNode = selection && selection.anchorNode;
		if (anchorNode ? anchorNode === target || anchorNode.contains(target) : false) return false;
		var canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
		if (!canBeScrolledInMainDirection) return true;
		if (canBeScrolledInMainDirection) currentAxis = moveDirection;
		else {
			currentAxis = moveDirection === "v" ? "h" : "v";
			canBeScrolledInMainDirection = locationCouldBeScrolled(moveDirection, target);
		}
		if (!canBeScrolledInMainDirection) return false;
		if (!activeAxis.current && "changedTouches" in event && (deltaX || deltaY)) activeAxis.current = currentAxis;
		if (!currentAxis) return true;
		var cancelingAxis = activeAxis.current || currentAxis;
		return handleScroll(cancelingAxis, parent, event, cancelingAxis === "h" ? deltaX : deltaY, true);
	}, []);
	var shouldPrevent = import_react.useCallback(function(_event) {
		var event = _event;
		if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) return;
		var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
		var sourceEvent = shouldPreventQueue.current.filter(function(e) {
			return e.name === event.type && (e.target === event.target || event.target === e.shadowParent) && deltaCompare(e.delta, delta);
		})[0];
		if (sourceEvent && sourceEvent.should) {
			if (event.cancelable) event.preventDefault();
			return;
		}
		if (!sourceEvent) {
			var shardNodes = (lastProps.current.shards || []).map(extractRef).filter(Boolean).filter(function(node) {
				return node.contains(event.target);
			});
			if (shardNodes.length > 0 ? shouldCancelEvent(event, shardNodes[0]) : !lastProps.current.noIsolation) {
				if (event.cancelable) event.preventDefault();
			}
		}
	}, []);
	var shouldCancel = import_react.useCallback(function(name, delta, target, should) {
		var event = {
			name,
			delta,
			target,
			should,
			shadowParent: getOutermostShadowParent(target)
		};
		shouldPreventQueue.current.push(event);
		setTimeout(function() {
			shouldPreventQueue.current = shouldPreventQueue.current.filter(function(e) {
				return e !== event;
			});
		}, 1);
	}, []);
	var scrollTouchStart = import_react.useCallback(function(event) {
		touchStartRef.current = getTouchXY(event);
		activeAxis.current = void 0;
	}, []);
	var scrollWheel = import_react.useCallback(function(event) {
		shouldCancel(event.type, getDeltaXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
	}, []);
	var scrollTouchMove = import_react.useCallback(function(event) {
		shouldCancel(event.type, getTouchXY(event), event.target, shouldCancelEvent(event, props.lockRef.current));
	}, []);
	import_react.useEffect(function() {
		lockStack.push(Style);
		props.setCallbacks({
			onScrollCapture: scrollWheel,
			onWheelCapture: scrollWheel,
			onTouchMoveCapture: scrollTouchMove
		});
		document.addEventListener("wheel", shouldPrevent, nonPassive);
		document.addEventListener("touchmove", shouldPrevent, nonPassive);
		document.addEventListener("touchstart", scrollTouchStart, nonPassive);
		return function() {
			lockStack = lockStack.filter(function(inst) {
				return inst !== Style;
			});
			document.removeEventListener("wheel", shouldPrevent, nonPassive);
			document.removeEventListener("touchmove", shouldPrevent, nonPassive);
			document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
		};
	}, []);
	var removeScrollBar = props.removeScrollBar, inert = props.inert;
	return import_react.createElement(import_react.Fragment, null, inert ? import_react.createElement(Style, { styles: generateStyle(id) }) : null, removeScrollBar ? import_react.createElement(RemoveScrollBar, {
		noRelative: props.noRelative,
		gapMode: props.gapMode
	}) : null);
}
function getOutermostShadowParent(node) {
	var shadowParent = null;
	while (node !== null) {
		if (node instanceof ShadowRoot) {
			shadowParent = node.host;
			node = node.host;
		}
		node = node.parentNode;
	}
	return shadowParent;
}
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/sidecar.js
var sidecar_default = exportSidecar(effectCar, RemoveScrollSideCar);
//#endregion
//#region node_modules/react-remove-scroll/dist/es2015/Combination.js
var ReactRemoveScroll = import_react.forwardRef(function(props, ref) {
	return import_react.createElement(RemoveScroll, __assign({}, props, {
		ref,
		sideCar: sidecar_default
	}));
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;
//#endregion
//#region node_modules/aria-hidden/dist/es2015/index.js
var getDefaultParent = function(originalTarget) {
	if (typeof document === "undefined") return null;
	return (Array.isArray(originalTarget) ? originalTarget[0] : originalTarget).ownerDocument.body;
};
var counterMap = /* @__PURE__ */ new WeakMap();
var uncontrolledNodes = /* @__PURE__ */ new WeakMap();
var markerMap = {};
var lockCount = 0;
var unwrapHost = function(node) {
	return node && (node.host || unwrapHost(node.parentNode));
};
var correctTargets = function(parent, targets) {
	return targets.map(function(target) {
		if (parent.contains(target)) return target;
		var correctedTarget = unwrapHost(target);
		if (correctedTarget && parent.contains(correctedTarget)) return correctedTarget;
		console.error("aria-hidden", target, "in not contained inside", parent, ". Doing nothing");
		return null;
	}).filter(function(x) {
		return Boolean(x);
	});
};
/**
* Marks everything except given node(or nodes) as aria-hidden
* @param {Element | Element[]} originalTarget - elements to keep on the page
* @param [parentNode] - top element, defaults to document.body
* @param {String} [markerName] - a special attribute to mark every node
* @param {String} [controlAttribute] - html Attribute to control
* @return {Undo} undo command
*/
var applyAttributeToOthers = function(originalTarget, parentNode, markerName, controlAttribute) {
	var targets = correctTargets(parentNode, Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
	if (!markerMap[markerName]) markerMap[markerName] = /* @__PURE__ */ new WeakMap();
	var markerCounter = markerMap[markerName];
	var hiddenNodes = [];
	var elementsToKeep = /* @__PURE__ */ new Set();
	var elementsToStop = new Set(targets);
	var keep = function(el) {
		if (!el || elementsToKeep.has(el)) return;
		elementsToKeep.add(el);
		keep(el.parentNode);
	};
	targets.forEach(keep);
	var deep = function(parent) {
		if (!parent || elementsToStop.has(parent)) return;
		Array.prototype.forEach.call(parent.children, function(node) {
			if (elementsToKeep.has(node)) deep(node);
			else try {
				var attr = node.getAttribute(controlAttribute);
				var alreadyHidden = attr !== null && attr !== "false";
				var counterValue = (counterMap.get(node) || 0) + 1;
				var markerValue = (markerCounter.get(node) || 0) + 1;
				counterMap.set(node, counterValue);
				markerCounter.set(node, markerValue);
				hiddenNodes.push(node);
				if (counterValue === 1 && alreadyHidden) uncontrolledNodes.set(node, true);
				if (markerValue === 1) node.setAttribute(markerName, "true");
				if (!alreadyHidden) node.setAttribute(controlAttribute, "true");
			} catch (e) {
				console.error("aria-hidden: cannot operate on ", node, e);
			}
		});
	};
	deep(parentNode);
	elementsToKeep.clear();
	lockCount++;
	return function() {
		hiddenNodes.forEach(function(node) {
			var counterValue = counterMap.get(node) - 1;
			var markerValue = markerCounter.get(node) - 1;
			counterMap.set(node, counterValue);
			markerCounter.set(node, markerValue);
			if (!counterValue) {
				if (!uncontrolledNodes.has(node)) node.removeAttribute(controlAttribute);
				uncontrolledNodes.delete(node);
			}
			if (!markerValue) node.removeAttribute(markerName);
		});
		lockCount--;
		if (!lockCount) {
			counterMap = /* @__PURE__ */ new WeakMap();
			counterMap = /* @__PURE__ */ new WeakMap();
			uncontrolledNodes = /* @__PURE__ */ new WeakMap();
			markerMap = {};
		}
	};
};
/**
* Marks everything except given node(or nodes) as aria-hidden
* @param {Element | Element[]} originalTarget - elements to keep on the page
* @param [parentNode] - top element, defaults to document.body
* @param {String} [markerName] - a special attribute to mark every node
* @return {Undo} undo command
*/
var hideOthers = function(originalTarget, parentNode, markerName) {
	if (markerName === void 0) markerName = "data-aria-hidden";
	var targets = Array.from(Array.isArray(originalTarget) ? originalTarget : [originalTarget]);
	var activeParentNode = parentNode || getDefaultParent(originalTarget);
	if (!activeParentNode) return function() {
		return null;
	};
	targets.push.apply(targets, Array.from(activeParentNode.querySelectorAll("[aria-live], script")));
	return applyAttributeToOthers(targets, activeParentNode, markerName, "aria-hidden");
};
//#endregion
//#region node_modules/@radix-ui/react-dialog/dist/index.mjs
var __defProp$6 = Object.defineProperty;
var __name$6 = (target, value) => __defProp$6(target, "name", {
	value,
	configurable: true
});
var DIALOG_NAME = "Dialog";
var [createDialogContext, createDialogScope] = /* @__PURE__ */ createContextScope(DIALOG_NAME);
var [DialogProvider, useDialogContext] = createDialogContext(DIALOG_NAME);
var Dialog$1 = /* @__PURE__ */ __name$6((props) => {
	const { __scopeDialog, children, open: openProp, defaultOpen, onOpenChange, modal = true } = props;
	const triggerRef = import_react.useRef(null);
	const contentRef = import_react.useRef(null);
	const { nodes: branchNodes, registry: branchRegistry } = useFocusScopeBranchRegistry();
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: onOpenChange,
		caller: DIALOG_NAME
	});
	const [titleCount, setTitleCount] = import_react.useState(0);
	const [descriptionCount, setDescriptionCount] = import_react.useState(0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogProvider, {
		scope: __scopeDialog,
		triggerRef,
		contentRef,
		contentId: useId(),
		titleId: useId(),
		descriptionId: useId(),
		titlePresent: titleCount > 0,
		descriptionPresent: descriptionCount > 0,
		setTitleCount,
		setDescriptionCount,
		open,
		onOpenChange: setOpen,
		onOpenToggle: import_react.useCallback(() => setOpen((prevOpen) => !prevOpen), [setOpen]),
		modal,
		branchNodes,
		branchRegistry,
		children
	});
}, "Dialog");
var TRIGGER_NAME$2 = "DialogTrigger";
var DialogTrigger = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$6(function DialogTrigger2(props, forwardedRef) {
	const { __scopeDialog, ...triggerProps } = props;
	const context = useDialogContext(TRIGGER_NAME$2, __scopeDialog);
	const composedTriggerRef = useComposedRefs(forwardedRef, context.triggerRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		"aria-haspopup": "dialog",
		"aria-expanded": context.open,
		"aria-controls": context.open ? context.contentId : void 0,
		"data-state": getState$1(context.open),
		...triggerProps,
		ref: composedTriggerRef,
		onClick: composeEventHandlers$1(props.onClick, context.onOpenToggle)
	});
}, "DialogTrigger"));
var PORTAL_NAME$1 = "DialogPortal";
var [PortalProvider$1, usePortalContext$1] = createDialogContext(PORTAL_NAME$1, { forceMount: void 0 });
var DialogPortal$1 = /* @__PURE__ */ __name$6((props) => {
	const { __scopeDialog, forceMount, children, container } = props;
	const context = useDialogContext(PORTAL_NAME$1, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalProvider$1, {
		scope: __scopeDialog,
		forceMount,
		children: import_react.Children.map(children, (child) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
			present: forceMount || context.open,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$1, {
				asChild: true,
				container,
				children: child
			})
		}))
	});
}, "DialogPortal");
var OVERLAY_NAME = "DialogOverlay";
var DialogOverlay$1 = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$6(function DialogOverlay2(props, forwardedRef) {
	const portalContext = usePortalContext$1(OVERLAY_NAME, props.__scopeDialog);
	const { forceMount = portalContext.forceMount, ...overlayProps } = props;
	const context = useDialogContext(OVERLAY_NAME, props.__scopeDialog);
	return context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlayImpl, {
			...overlayProps,
			ref: forwardedRef
		})
	}) : null;
}, "DialogOverlay"));
var Slot = /* @__PURE__ */ createSlot("DialogOverlay.RemoveScroll");
var DialogOverlayImpl = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$6(function DialogOverlayImpl2(props, forwardedRef) {
	const { __scopeDialog, ...overlayProps } = props;
	const context = useDialogContext(OVERLAY_NAME, __scopeDialog);
	const composedRefs = useComposedRefs(forwardedRef, useDismissableLayerSurface());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReactRemoveScroll, {
		as: Slot,
		allowPinchZoom: true,
		shards: import_react.useMemo(() => [context.contentRef, ...context.branchNodes.map((node) => ({ current: node }))], [context.contentRef, context.branchNodes]),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
			"data-state": getState$1(context.open),
			...overlayProps,
			ref: composedRefs,
			style: {
				pointerEvents: "auto",
				...overlayProps.style
			}
		})
	});
}, "DialogOverlayImpl"));
var CONTENT_NAME$2 = "DialogContent";
var DialogContent$1 = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$6(function DialogContent2(props, forwardedRef) {
	const portalContext = usePortalContext$1(CONTENT_NAME$2, props.__scopeDialog);
	const { forceMount = portalContext.forceMount, ...contentProps } = props;
	const context = useDialogContext(CONTENT_NAME$2, props.__scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: context.modal ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentModal, {
			...contentProps,
			ref: forwardedRef
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentNonModal, {
			...contentProps,
			ref: forwardedRef
		})
	});
}, "DialogContent"));
var DialogContentModal = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$6(function DialogContentModal2(props, forwardedRef) {
	const context = useDialogContext(CONTENT_NAME$2, props.__scopeDialog);
	const contentRef = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, context.contentRef, contentRef);
	import_react.useEffect(() => {
		const content = contentRef.current;
		if (content) return hideOthers(content);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentImpl, {
		...props,
		ref: composedRefs,
		trapFocus: context.open,
		disableOutsidePointerEvents: context.open,
		onCloseAutoFocus: composeEventHandlers$1(props.onCloseAutoFocus, (event) => {
			event.preventDefault();
			context.triggerRef.current?.focus();
		}),
		onPointerDownOutside: composeEventHandlers$1(props.onPointerDownOutside, (event) => {
			const originalEvent = event.detail.originalEvent;
			const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
			if (originalEvent.button === 2 || ctrlLeftClick) event.preventDefault();
		}),
		onFocusOutside: composeEventHandlers$1(props.onFocusOutside, (event) => event.preventDefault())
	});
}, "DialogContentModal"));
var DialogContentNonModal = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$6(function DialogContentNonModal2(props, forwardedRef) {
	const context = useDialogContext(CONTENT_NAME$2, props.__scopeDialog);
	const hasInteractedOutsideRef = import_react.useRef(false);
	const hasPointerDownOutsideRef = import_react.useRef(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContentImpl, {
		...props,
		ref: forwardedRef,
		trapFocus: false,
		disableOutsidePointerEvents: false,
		onCloseAutoFocus: (event) => {
			props.onCloseAutoFocus?.(event);
			if (!event.defaultPrevented) {
				if (!hasInteractedOutsideRef.current) context.triggerRef.current?.focus();
				event.preventDefault();
			}
			hasInteractedOutsideRef.current = false;
			hasPointerDownOutsideRef.current = false;
		},
		onInteractOutside: (event) => {
			props.onInteractOutside?.(event);
			if (!event.defaultPrevented) {
				hasInteractedOutsideRef.current = true;
				if (event.detail.originalEvent.type === "pointerdown") hasPointerDownOutsideRef.current = true;
			}
			const target = event.target;
			if (context.triggerRef.current?.contains(target)) event.preventDefault();
			if (event.detail.originalEvent.type === "focusin" && hasPointerDownOutsideRef.current) event.preventDefault();
		}
	});
}, "DialogContentNonModal"));
var DialogContentImpl = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$6(function DialogContentImpl2(props, forwardedRef) {
	const { __scopeDialog, trapFocus, onOpenAutoFocus, onCloseAutoFocus, "aria-describedby": ariaDescribedby, children, ...contentProps } = props;
	const context = useDialogContext(CONTENT_NAME$2, __scopeDialog);
	useFocusGuards();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScopeBranchProvider, {
		registry: context.branchRegistry,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusScope, {
			asChild: true,
			loop: true,
			trapped: trapFocus,
			branches: context.branchNodes,
			onMountAutoFocus: onOpenAutoFocus,
			onUnmountAutoFocus: onCloseAutoFocus,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
				role: "dialog",
				id: context.contentId,
				"aria-labelledby": context.titlePresent ? context.titleId : void 0,
				"aria-describedby": context.descriptionPresent ? concatAriaDescribedby$1(ariaDescribedby, context.descriptionId) : ariaDescribedby,
				"data-state": getState$1(context.open),
				...contentProps,
				ref: forwardedRef,
				deferPointerDownOutside: true,
				onDismiss: () => context.onOpenChange(false),
				children
			})
		})
	});
}, "DialogContentImpl"));
var DialogTitle$1 = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$6(function DialogTitle2(props, forwardedRef) {
	const { __scopeDialog, ...titleProps } = props;
	const context = useDialogContext("DialogTitle", __scopeDialog);
	const { setTitleCount } = context;
	useLayoutEffect2(() => {
		setTitleCount((count) => count + 1);
		return () => setTitleCount((count) => count - 1);
	}, [setTitleCount]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.h2, {
		id: context.titleId,
		...titleProps,
		ref: forwardedRef
	});
}, "DialogTitle"));
var DialogDescription$1 = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$6(function DialogDescription2(props, forwardedRef) {
	const { __scopeDialog, ...descriptionProps } = props;
	const context = useDialogContext("DialogDescription", __scopeDialog);
	const { setDescriptionCount } = context;
	useLayoutEffect2(() => {
		setDescriptionCount((count) => count + 1);
		return () => setDescriptionCount((count) => count - 1);
	}, [setDescriptionCount]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.p, {
		id: context.descriptionId,
		...descriptionProps,
		ref: forwardedRef
	});
}, "DialogDescription"));
var CLOSE_NAME = "DialogClose";
var DialogClose$1 = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$6(function DialogClose2(props, forwardedRef) {
	const { __scopeDialog, ...closeProps } = props;
	const context = useDialogContext(CLOSE_NAME, __scopeDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		...closeProps,
		ref: forwardedRef,
		onClick: composeEventHandlers$1(props.onClick, () => context.onOpenChange(false))
	});
}, "DialogClose"));
function concatAriaDescribedby$1(...values) {
	const ids = /* @__PURE__ */ new Set();
	for (const value of values) {
		if (typeof value !== "string") continue;
		for (const id of String(value).trim().split(/\s+/)) if (id) ids.add(id);
	}
	return ids.size > 0 ? Array.from(ids).join(" ") : void 0;
}
__name$6(concatAriaDescribedby$1, "concatAriaDescribedby");
function getState$1(open) {
	return open ? "open" : "closed";
}
__name$6(getState$1, "getState");
//#endregion
//#region node_modules/@radix-ui/react-alert-dialog/dist/index.mjs
var __defProp$5 = Object.defineProperty;
var __name$5 = (target, value) => __defProp$5(target, "name", {
	value,
	configurable: true
});
var [createAlertDialogContext, createAlertDialogScope] = /* @__PURE__ */ createContextScope("AlertDialog", [createDialogScope]);
var useDialogScope = createDialogScope();
var AlertDialog = /* @__PURE__ */ __name$5((props) => {
	const { __scopeAlertDialog, ...alertDialogProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		...dialogScope,
		...alertDialogProps,
		modal: true
	});
}, "AlertDialog");
import_react.forwardRef(/* @__PURE__ */ __name$5(function AlertDialogTrigger2(props, forwardedRef) {
	const { __scopeAlertDialog, ...triggerProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
		...dialogScope,
		...triggerProps,
		ref: forwardedRef
	});
}, "AlertDialogTrigger"));
var AlertDialogPortal = /* @__PURE__ */ __name$5((props) => {
	const { __scopeAlertDialog, ...portalProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
		...dialogScope,
		...portalProps
	});
}, "AlertDialogPortal");
var AlertDialogOverlay = import_react.forwardRef(/* @__PURE__ */ __name$5(function AlertDialogOverlay2(props, forwardedRef) {
	const { __scopeAlertDialog, ...overlayProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		...dialogScope,
		...overlayProps,
		ref: forwardedRef
	});
}, "AlertDialogOverlay"));
var [AlertDialogContentProvider, useAlertDialogContentContext] = createAlertDialogContext("AlertDialogContent");
var AlertDialogContent = import_react.forwardRef(/* @__PURE__ */ __name$5(function AlertDialogContent2(props, forwardedRef) {
	const { __scopeAlertDialog, children, ...contentProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const composedRefs = useComposedRefs(forwardedRef, import_react.useRef(null));
	const cancelRef = import_react.useRef(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogContentProvider, {
		scope: __scopeAlertDialog,
		cancelRef,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent$1, {
			role: "alertdialog",
			...dialogScope,
			...contentProps,
			ref: composedRefs,
			onOpenAutoFocus: composeEventHandlers$1(contentProps.onOpenAutoFocus, (event) => {
				event.preventDefault();
				cancelRef.current?.focus({ preventScroll: true });
			}),
			onPointerDownOutside: (event) => event.preventDefault(),
			onInteractOutside: (event) => event.preventDefault(),
			children
		})
	});
}, "AlertDialogContent"));
var AlertDialogTitle = import_react.forwardRef(/* @__PURE__ */ __name$5(function AlertDialogTitle2(props, forwardedRef) {
	const { __scopeAlertDialog, ...titleProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		...dialogScope,
		...titleProps,
		ref: forwardedRef
	});
}, "AlertDialogTitle"));
var AlertDialogDescription = import_react.forwardRef(/* @__PURE__ */ __name$5(function AlertDialogDescription2(props, forwardedRef) {
	const { __scopeAlertDialog, ...descriptionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		...dialogScope,
		...descriptionProps,
		ref: forwardedRef
	});
}, "AlertDialogDescription"));
var AlertDialogAction = import_react.forwardRef(/* @__PURE__ */ __name$5(function AlertDialogAction2(props, forwardedRef) {
	const { __scopeAlertDialog, ...actionProps } = props;
	const dialogScope = useDialogScope(__scopeAlertDialog);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose$1, {
		...dialogScope,
		...actionProps,
		ref: forwardedRef
	});
}, "AlertDialogAction"));
var CANCEL_NAME = "AlertDialogCancel";
var AlertDialogCancel = import_react.forwardRef(/* @__PURE__ */ __name$5(function AlertDialogCancel2(props, forwardedRef) {
	const { __scopeAlertDialog, ...cancelProps } = props;
	const { cancelRef } = useAlertDialogContentContext(CANCEL_NAME, __scopeAlertDialog);
	const dialogScope = useDialogScope(__scopeAlertDialog);
	const ref = useComposedRefs(forwardedRef, cancelRef);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose$1, {
		...dialogScope,
		...cancelProps,
		ref
	});
}, "AlertDialogCancel"));
//#endregion
//#region node_modules/@radix-ui/react-use-size/dist/index.mjs
var __defProp$4 = Object.defineProperty;
var __name$4 = (target, value) => __defProp$4(target, "name", {
	value,
	configurable: true
});
function useSize(element) {
	const [size, setSize] = import_react.useState(void 0);
	useLayoutEffect2(() => {
		if (element) {
			setSize({
				width: element.offsetWidth,
				height: element.offsetHeight
			});
			let rAF = 0;
			const resizeObserver = new ResizeObserver((entries) => {
				if (!Array.isArray(entries)) return;
				if (!entries.length) return;
				const entry = entries[0];
				window.cancelAnimationFrame(rAF);
				rAF = window.requestAnimationFrame(() => {
					let width;
					let height;
					if ("borderBoxSize" in entry) {
						const borderSizeEntry = entry["borderBoxSize"];
						const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
						width = borderSize["inlineSize"];
						height = borderSize["blockSize"];
					} else {
						width = element.offsetWidth;
						height = element.offsetHeight;
					}
					setSize({
						width,
						height
					});
				});
			});
			resizeObserver.observe(element, { box: "border-box" });
			return () => {
				window.cancelAnimationFrame(rAF);
				resizeObserver.unobserve(element);
			};
		} else setSize(void 0);
	}, [element]);
	return size;
}
__name$4(useSize, "useSize");
//#endregion
//#region node_modules/@radix-ui/react-checkbox/dist/index.mjs
var __defProp$3 = Object.defineProperty;
var __name$3 = (target, value) => __defProp$3(target, "name", {
	value,
	configurable: true
});
var CHECKBOX_NAME = "Checkbox";
var [createCheckboxContext, createCheckboxScope] = /* @__PURE__ */ createContextScope(CHECKBOX_NAME);
var [CheckboxProviderImpl, useCheckboxContext] = createCheckboxContext(CHECKBOX_NAME);
function CheckboxProvider(props) {
	const { __scopeCheckbox, checked: checkedProp, children, defaultChecked, disabled, form, name, onCheckedChange, required, value = "on", internal_do_not_use_render } = props;
	const [checked, setChecked] = useControllableState({
		prop: checkedProp,
		defaultProp: defaultChecked ?? false,
		onChange: onCheckedChange,
		caller: CHECKBOX_NAME
	});
	const [control, setControl] = import_react.useState(null);
	const [bubbleInput, setBubbleInput] = import_react.useState(null);
	const hasConsumerStoppedPropagationRef = import_react.useRef(false);
	const [userInteractionCount, onUserInteraction] = import_react.useReducer((count) => count + 1, 0);
	const isFormControl = control ? !!form || !!control.closest("form") : true;
	const context = {
		checked,
		disabled,
		setChecked,
		control,
		setControl,
		name,
		form,
		value,
		hasConsumerStoppedPropagationRef,
		userInteractionCount,
		onUserInteraction,
		required,
		defaultChecked: isIndeterminate(defaultChecked) ? false : defaultChecked,
		isFormControl,
		bubbleInput,
		setBubbleInput
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxProviderImpl, {
		scope: __scopeCheckbox,
		...context,
		children: isFunction(internal_do_not_use_render) ? internal_do_not_use_render(context) : children
	});
}
__name$3(CheckboxProvider, "CheckboxProvider");
var TRIGGER_NAME$1 = "CheckboxTrigger";
var CheckboxTrigger = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$3(function CheckboxTrigger2({ __scopeCheckbox, onKeyDown, onClick, ...checkboxProps }, forwardedRef) {
	const { control, value, disabled, checked, required, setControl, setChecked, hasConsumerStoppedPropagationRef, onUserInteraction, isFormControl, bubbleInput } = useCheckboxContext(TRIGGER_NAME$1, __scopeCheckbox);
	const composedRefs = useComposedRefs(forwardedRef, setControl);
	const initialCheckedStateRef = import_react.useRef(checked);
	import_react.useEffect(() => {
		const form = control?.form;
		if (form) {
			const reset = /* @__PURE__ */ __name$3(() => setChecked(initialCheckedStateRef.current), "reset");
			form.addEventListener("reset", reset);
			return () => form.removeEventListener("reset", reset);
		}
	}, [control, setChecked]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
		type: "button",
		role: "checkbox",
		"aria-checked": isIndeterminate(checked) ? "mixed" : checked,
		"aria-required": required,
		"data-state": getState(checked),
		"data-disabled": disabled ? "" : void 0,
		disabled,
		value,
		...checkboxProps,
		ref: composedRefs,
		onKeyDown: composeEventHandlers$1(onKeyDown, (event) => {
			if (event.key === "Enter") event.preventDefault();
		}),
		onClick: composeEventHandlers$1(onClick, (event) => {
			onUserInteraction();
			setChecked((prevChecked) => isIndeterminate(prevChecked) ? true : !prevChecked);
			if (bubbleInput && isFormControl) {
				hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
				if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
			}
		})
	});
}, "CheckboxTrigger"));
var Checkbox$1 = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$3(function Checkbox2(props, forwardedRef) {
	const { __scopeCheckbox, name, checked, defaultChecked, required, disabled, value, onCheckedChange, form, ...checkboxProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxProvider, {
		__scopeCheckbox,
		checked,
		defaultChecked,
		disabled,
		required,
		onCheckedChange,
		name,
		form,
		value,
		internal_do_not_use_render: ({ isFormControl }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxTrigger, {
			...checkboxProps,
			ref: forwardedRef,
			__scopeCheckbox
		}), isFormControl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxBubbleInput, { __scopeCheckbox })] })
	});
}, "Checkbox"));
var INDICATOR_NAME = "CheckboxIndicator";
var CheckboxIndicator = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$3(function CheckboxIndicator2(props, forwardedRef) {
	const { __scopeCheckbox, forceMount, ...indicatorProps } = props;
	const context = useCheckboxContext(INDICATOR_NAME, __scopeCheckbox);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || isIndeterminate(context.checked) || context.checked === true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.span, {
			"data-state": getState(context.checked),
			"data-disabled": context.disabled ? "" : void 0,
			...indicatorProps,
			ref: forwardedRef,
			style: {
				pointerEvents: "none",
				...props.style
			}
		})
	});
}, "CheckboxIndicator"));
var BUBBLE_INPUT_NAME = "CheckboxBubbleInput";
var CheckboxBubbleInput = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$3(function CheckboxBubbleInput2({ __scopeCheckbox, onClick, ...props }, forwardedRef) {
	const { control, hasConsumerStoppedPropagationRef, userInteractionCount, checked, defaultChecked, required, disabled, name, value, form, bubbleInput, setBubbleInput } = useCheckboxContext(BUBBLE_INPUT_NAME, __scopeCheckbox);
	const composedRefs = useComposedRefs(forwardedRef, setBubbleInput);
	const controlSize = useSize(control);
	const shouldStopClickPropagationRef = import_react.useRef(false);
	const prevCheckedRef = import_react.useRef(checked);
	const prevUserInteractionCountRef = import_react.useRef(userInteractionCount);
	import_react.useEffect(() => {
		const input = bubbleInput;
		if (!input) return;
		const inputProto = window.HTMLInputElement.prototype;
		const setChecked = Object.getOwnPropertyDescriptor(inputProto, "checked").set;
		const isUserInteraction = userInteractionCount !== prevUserInteractionCountRef.current;
		prevUserInteractionCountRef.current = userInteractionCount;
		const checkedChanged = prevCheckedRef.current !== checked;
		prevCheckedRef.current = checked;
		const bubbles = !(isUserInteraction && hasConsumerStoppedPropagationRef.current);
		if (checkedChanged && setChecked) {
			shouldStopClickPropagationRef.current = !isUserInteraction;
			const event = new Event("click", { bubbles });
			input.indeterminate = isIndeterminate(checked);
			setChecked.call(input, isIndeterminate(checked) ? false : checked);
			input.dispatchEvent(event);
			shouldStopClickPropagationRef.current = false;
		}
	}, [
		bubbleInput,
		checked,
		hasConsumerStoppedPropagationRef,
		userInteractionCount
	]);
	const defaultCheckedRef = import_react.useRef(isIndeterminate(checked) ? false : checked);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.input, {
		type: "checkbox",
		"aria-hidden": true,
		defaultChecked: defaultChecked ?? defaultCheckedRef.current,
		required,
		disabled,
		name,
		value,
		form,
		...props,
		tabIndex: -1,
		ref: composedRefs,
		onClick: composeEventHandlers$1(onClick, (event) => {
			if (shouldStopClickPropagationRef.current) event.stopPropagation();
		}),
		style: {
			...props.style,
			...controlSize,
			position: "absolute",
			pointerEvents: "none",
			opacity: 0,
			margin: 0,
			transform: "translateX(-100%)"
		}
	});
}, "CheckboxBubbleInput"));
function isFunction(value) {
	return typeof value === "function";
}
__name$3(isFunction, "isFunction");
function isIndeterminate(checked) {
	return checked === "indeterminate";
}
__name$3(isIndeterminate, "isIndeterminate");
function getState(checked) {
	return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
}
__name$3(getState, "getState");
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
/**
* Custom positioning reference element.
* @see https://floating-ui.com/docs/virtual-elements
*/
var sides = [
	"top",
	"right",
	"bottom",
	"left"
];
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v) => ({
	x: v,
	y: v
});
var oppositeSideMap = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function clamp$2(start, value, end) {
	return max(start, min(value, end));
}
function evaluate$1(value, param) {
	return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
	return placement.split("-")[0];
}
function getAlignment(placement) {
	return placement.split("-")[1];
}
function getOppositeAxis(axis) {
	return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
	return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
	const firstChar = placement[0];
	return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
	return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
	if (rtl === void 0) rtl = false;
	const alignment = getAlignment(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const length = getAxisLength(alignmentAxis);
	let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
	if (rects.reference[length] > rects.floating[length]) mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
	return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
	const oppositePlacement = getOppositePlacement(placement);
	return [
		getOppositeAlignmentPlacement(placement),
		oppositePlacement,
		getOppositeAlignmentPlacement(oppositePlacement)
	];
}
function getOppositeAlignmentPlacement(placement) {
	return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
	switch (side) {
		case "top":
		case "bottom":
			if (rtl) return isStart ? rlPlacement : lrPlacement;
			return isStart ? lrPlacement : rlPlacement;
		case "left":
		case "right": return isStart ? tbPlacement : btPlacement;
		default: return [];
	}
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
	const alignment = getAlignment(placement);
	let list = getSideList(getSide(placement), direction === "start", rtl);
	if (alignment) {
		list = list.map((side) => side + "-" + alignment);
		if (flipAlignment) list = list.concat(list.map(getOppositeAlignmentPlacement));
	}
	return list;
}
function getOppositePlacement(placement) {
	const side = getSide(placement);
	return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
	var _padding$top, _padding$right, _padding$bottom, _padding$left;
	return {
		top: (_padding$top = padding.top) != null ? _padding$top : 0,
		right: (_padding$right = padding.right) != null ? _padding$right : 0,
		bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
		left: (_padding$left = padding.left) != null ? _padding$left : 0
	};
}
function getPaddingObject(padding) {
	return typeof padding !== "number" ? expandPaddingObject(padding) : {
		top: padding,
		right: padding,
		bottom: padding,
		left: padding
	};
}
function rectToClientRect(rect) {
	const { x, y, width, height } = rect;
	return {
		width,
		height,
		top: y,
		left: x,
		right: x + width,
		bottom: y + height,
		x,
		y
	};
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
	let { reference, floating } = _ref;
	const sideAxis = getSideAxis(placement);
	const alignmentAxis = getAlignmentAxis(placement);
	const alignLength = getAxisLength(alignmentAxis);
	const side = getSide(placement);
	const isVertical = sideAxis === "y";
	const commonX = reference.x + reference.width / 2 - floating.width / 2;
	const commonY = reference.y + reference.height / 2 - floating.height / 2;
	const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
	let coords;
	switch (side) {
		case "top":
			coords = {
				x: commonX,
				y: reference.y - floating.height
			};
			break;
		case "bottom":
			coords = {
				x: commonX,
				y: reference.y + reference.height
			};
			break;
		case "right":
			coords = {
				x: reference.x + reference.width,
				y: commonY
			};
			break;
		case "left":
			coords = {
				x: reference.x - floating.width,
				y: commonY
			};
			break;
		default: coords = {
			x: reference.x,
			y: reference.y
		};
	}
	const alignment = getAlignment(placement);
	if (alignment) coords[alignmentAxis] += commonAlign * (alignment === "end" ? 1 : -1) * (rtl && isVertical ? -1 : 1);
	return coords;
}
/**
* Resolves with an object of overflow side offsets that determine how much the
* element is overflowing a given clipping boundary on each side.
* - positive = overflowing the boundary by that number of pixels
* - negative = how many pixels left before it will overflow
* - 0 = lies flush with the boundary
* @see https://floating-ui.com/docs/detectOverflow
*/
async function detectOverflow(state, options) {
	var _await$platform$isEle;
	if (options === void 0) options = {};
	const { x, y, platform, rects, elements, strategy } = state;
	const { boundary = "clippingAncestors", rootBoundary = "viewport", elementContext = "floating", altBoundary = false, padding = 0 } = evaluate$1(options, state);
	const paddingObject = getPaddingObject(padding);
	const element = elements[altBoundary ? elementContext === "floating" ? "reference" : "floating" : elementContext];
	const clippingClientRect = rectToClientRect(await platform.getClippingRect({
		element: ((_await$platform$isEle = await (platform.isElement == null ? void 0 : platform.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform.getDocumentElement == null ? void 0 : platform.getDocumentElement(elements.floating)),
		boundary,
		rootBoundary,
		strategy
	}));
	const rect = elementContext === "floating" ? {
		x,
		y,
		width: rects.floating.width,
		height: rects.floating.height
	} : rects.reference;
	const offsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(elements.floating));
	const offsetScale = await (platform.isElement == null ? void 0 : platform.isElement(offsetParent)) && await (platform.getScale == null ? void 0 : platform.getScale(offsetParent)) || {
		x: 1,
		y: 1
	};
	const elementClientRect = rectToClientRect(platform.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements,
		rect,
		offsetParent,
		strategy
	}) : rect);
	return {
		top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
		bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
		left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
		right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
	};
}
var MAX_RESET_COUNT = 50;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*
* This export does not have any `platform` interface logic. You will need to
* write one for the platform you are using Floating UI with.
*/
var computePosition$1 = async (reference, floating, config) => {
	const { placement = "bottom", strategy = "absolute", middleware = [], platform } = config;
	const platformWithDetectOverflow = platform.detectOverflow ? platform : {
		...platform,
		detectOverflow
	};
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(floating));
	let rects = await platform.getElementRects({
		reference,
		floating,
		strategy
	});
	let { x, y } = computeCoordsFromPlacement(rects, placement, rtl);
	let statefulPlacement = placement;
	let resetCount = 0;
	const middlewareData = {};
	for (let i = 0; i < middleware.length; i++) {
		const currentMiddleware = middleware[i];
		if (!currentMiddleware) continue;
		const { name, fn } = currentMiddleware;
		const { x: nextX, y: nextY, data, reset } = await fn({
			x,
			y,
			initialPlacement: placement,
			placement: statefulPlacement,
			strategy,
			middlewareData,
			rects,
			platform: platformWithDetectOverflow,
			elements: {
				reference,
				floating
			}
		});
		x = nextX != null ? nextX : x;
		y = nextY != null ? nextY : y;
		middlewareData[name] = {
			...middlewareData[name],
			...data
		};
		if (reset && resetCount < MAX_RESET_COUNT) {
			resetCount++;
			if (typeof reset === "object") {
				if (reset.placement) statefulPlacement = reset.placement;
				if (reset.rects) rects = reset.rects === true ? await platform.getElementRects({
					reference,
					floating,
					strategy
				}) : reset.rects;
				({x, y} = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
			}
			i = -1;
		}
	}
	return {
		x,
		y,
		placement: statefulPlacement,
		strategy,
		middlewareData
	};
};
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow$3 = (options) => ({
	name: "arrow",
	options,
	async fn(state) {
		const { x, y, placement, rects, platform, elements, middlewareData } = state;
		const { element, padding = 0 } = evaluate$1(options, state) || {};
		if (element == null) return {};
		const paddingObject = getPaddingObject(padding);
		const coords = {
			x,
			y
		};
		const axis = getAlignmentAxis(placement);
		const length = getAxisLength(axis);
		const arrowDimensions = await platform.getDimensions(element);
		const isYAxis = axis === "y";
		const minProp = isYAxis ? "top" : "left";
		const maxProp = isYAxis ? "bottom" : "right";
		const clientProp = isYAxis ? "clientHeight" : "clientWidth";
		const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
		const startDiff = coords[axis] - rects.reference[axis];
		const arrowOffsetParent = await (platform.getOffsetParent == null ? void 0 : platform.getOffsetParent(element));
		let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
		if (!clientSize || !await (platform.isElement == null ? void 0 : platform.isElement(arrowOffsetParent))) clientSize = elements.floating[clientProp] || rects.floating[length];
		const centerToReference = endDiff / 2 - startDiff / 2;
		const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
		const minPadding = min(paddingObject[minProp], largestPossiblePadding);
		const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
		const max = clientSize - arrowDimensions[length] - maxPadding;
		const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
		const offset = clamp$2(minPadding, center, max);
		const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset && rects.reference[length] / 2 - (center < minPadding ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
		const alignmentOffset = shouldAddOffset ? center < minPadding ? center - minPadding : center - max : 0;
		return {
			[axis]: coords[axis] + alignmentOffset,
			data: {
				[axis]: offset,
				centerOffset: center - offset - alignmentOffset,
				...shouldAddOffset && { alignmentOffset }
			},
			reset: shouldAddOffset
		};
	}
});
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "flip",
		options,
		async fn(state) {
			var _middlewareData$arrow, _middlewareData$flip;
			const { placement, middlewareData, rects, initialPlacement, platform, elements } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true, fallbackPlacements: specifiedFallbackPlacements, fallbackStrategy = "bestFit", fallbackAxisSideDirection = "none", flipAlignment = true, ...detectOverflowOptions } = evaluate$1(options, state);
			if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			const side = getSide(placement);
			const initialSideAxis = getSideAxis(initialPlacement);
			const isBasePlacement = getSide(initialPlacement) === initialPlacement;
			const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
			const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
			const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
			if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
			const placements = [initialPlacement, ...fallbackPlacements];
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const overflows = [];
			let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
			if (checkMainAxis) overflows.push(overflow[side]);
			if (checkCrossAxis) {
				const sides = getAlignmentSides(placement, rects, rtl);
				overflows.push(overflow[sides[0]], overflow[sides[1]]);
			}
			overflowsData = [...overflowsData, {
				placement,
				overflows
			}];
			if (!overflows.every((side) => side <= 0)) {
				var _middlewareData$flip2, _overflowsData$filter;
				const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
				const nextPlacement = placements[nextIndex];
				if (nextPlacement) {
					if (!(checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false) || overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) return {
						data: {
							index: nextIndex,
							overflows: overflowsData
						},
						reset: { placement: nextPlacement }
					};
				}
				let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
				if (!resetPlacement) switch (fallbackStrategy) {
					case "bestFit": {
						var _overflowsData$filter2;
						const placement = (_overflowsData$filter2 = overflowsData.filter((d) => {
							if (hasFallbackAxisSideDirection) {
								const currentSideAxis = getSideAxis(d.placement);
								return currentSideAxis === initialSideAxis || currentSideAxis === "y";
							}
							return true;
						}).map((d) => [d.placement, d.overflows.filter((overflow) => overflow > 0).reduce((acc, overflow) => acc + overflow, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
						if (placement) resetPlacement = placement;
						break;
					}
					case "initialPlacement": resetPlacement = initialPlacement;
				}
				if (placement !== resetPlacement) return { reset: { placement: resetPlacement } };
			}
			return {};
		}
	};
};
function getSideOffsets(overflow, rect) {
	return {
		top: overflow.top - rect.height,
		right: overflow.right - rect.width,
		bottom: overflow.bottom - rect.height,
		left: overflow.left - rect.width
	};
}
function isAnySideFullyClipped(overflow) {
	return sides.some((side) => overflow[side] >= 0);
}
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "hide",
		options,
		async fn(state) {
			const { rects, platform } = state;
			const { strategy = "referenceHidden", ...detectOverflowOptions } = evaluate$1(options, state);
			switch (strategy) {
				case "referenceHidden": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						elementContext: "reference"
					}), rects.reference);
					return { data: {
						referenceHiddenOffsets: offsets,
						referenceHidden: isAnySideFullyClipped(offsets)
					} };
				}
				case "escaped": {
					const offsets = getSideOffsets(await platform.detectOverflow(state, {
						...detectOverflowOptions,
						altBoundary: true
					}), rects.floating);
					return { data: {
						escapedOffsets: offsets,
						escaped: isAnySideFullyClipped(offsets)
					} };
				}
				default: return {};
			}
		}
	};
};
var originSides = /*#__PURE__*/ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
	const { placement, platform, elements } = state;
	const rtl = await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating));
	const side = getSide(placement);
	const alignment = getAlignment(placement);
	const isVertical = getSideAxis(placement) === "y";
	const mainAxisMulti = originSides.has(side) ? -1 : 1;
	const crossAxisMulti = rtl && isVertical ? -1 : 1;
	const rawValue = evaluate$1(options, state);
	let { mainAxis, crossAxis, alignmentAxis } = typeof rawValue === "number" ? {
		mainAxis: rawValue,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: rawValue.mainAxis || 0,
		crossAxis: rawValue.crossAxis || 0,
		alignmentAxis: rawValue.alignmentAxis
	};
	if (alignment && typeof alignmentAxis === "number") crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
	return isVertical ? {
		x: crossAxis * crossAxisMulti,
		y: mainAxis * mainAxisMulti
	} : {
		x: mainAxis * mainAxisMulti,
		y: crossAxis * crossAxisMulti
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset$2 = function(options) {
	if (options === void 0) options = 0;
	return {
		name: "offset",
		options,
		async fn(state) {
			var _middlewareData$offse, _middlewareData$arrow;
			const { x, y, placement, middlewareData } = state;
			const diffCoords = await convertValueToCoords(state, options);
			if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) return {};
			return {
				x: x + diffCoords.x,
				y: y + diffCoords.y,
				data: {
					...diffCoords,
					placement
				}
			};
		}
	};
};
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "shift",
		options,
		async fn(state) {
			const { x, y, placement, platform } = state;
			const { mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = false, limiter = { fn: (_ref) => {
				let { x, y } = _ref;
				return {
					x,
					y
				};
			} }, ...detectOverflowOptions } = evaluate$1(options, state);
			const coords = {
				x,
				y
			};
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const clampCoord = (axis, coord) => clamp$2(coord + overflow[axis === "y" ? "top" : "left"], coord, coord - overflow[axis === "y" ? "bottom" : "right"]);
			if (checkMainAxis) mainAxisCoord = clampCoord(mainAxis, mainAxisCoord);
			if (checkCrossAxis) crossAxisCoord = clampCoord(crossAxis, crossAxisCoord);
			const limitedCoords = limiter.fn({
				...state,
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			});
			return {
				...limitedCoords,
				data: {
					x: limitedCoords.x - x,
					y: limitedCoords.y - y,
					enabled: {
						[mainAxis]: checkMainAxis,
						[crossAxis]: checkCrossAxis
					}
				}
			};
		}
	};
};
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift$2 = function(options) {
	if (options === void 0) options = {};
	return {
		options,
		fn(state) {
			var _rawOffset$mainAxis, _rawOffset$crossAxis;
			const { x, y, placement, rects, middlewareData } = state;
			const { offset = 0, mainAxis: checkMainAxis = true, crossAxis: checkCrossAxis = true } = evaluate$1(options, state);
			const coords = {
				x,
				y
			};
			const crossAxis = getSideAxis(placement);
			const mainAxis = getOppositeAxis(crossAxis);
			let mainAxisCoord = coords[mainAxis];
			let crossAxisCoord = coords[crossAxis];
			const rawOffset = evaluate$1(offset, state);
			const computedOffset = typeof rawOffset === "number" ? {
				mainAxis: rawOffset,
				crossAxis: 0
			} : {
				mainAxis: (_rawOffset$mainAxis = rawOffset.mainAxis) != null ? _rawOffset$mainAxis : 0,
				crossAxis: (_rawOffset$crossAxis = rawOffset.crossAxis) != null ? _rawOffset$crossAxis : 0
			};
			if (checkMainAxis) {
				const len = mainAxis === "y" ? "height" : "width";
				const limitMin = rects.reference[mainAxis] - rects.floating[len] + computedOffset.mainAxis;
				const limitMax = rects.reference[mainAxis] + rects.reference[len] - computedOffset.mainAxis;
				if (mainAxisCoord < limitMin) mainAxisCoord = limitMin;
				else if (mainAxisCoord > limitMax) mainAxisCoord = limitMax;
			}
			if (checkCrossAxis) {
				var _middlewareData$offse, _middlewareData$offse2;
				const len = mainAxis === "y" ? "width" : "height";
				const isOriginSide = originSides.has(getSide(placement));
				const limitMin = rects.reference[crossAxis] - rects.floating[len] + (isOriginSide ? ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse[crossAxis]) || 0 : 0) + (isOriginSide ? 0 : computedOffset.crossAxis);
				const limitMax = rects.reference[crossAxis] + rects.reference[len] + (isOriginSide ? 0 : ((_middlewareData$offse2 = middlewareData.offset) == null ? void 0 : _middlewareData$offse2[crossAxis]) || 0) - (isOriginSide ? computedOffset.crossAxis : 0);
				if (crossAxisCoord < limitMin) crossAxisCoord = limitMin;
				else if (crossAxisCoord > limitMax) crossAxisCoord = limitMax;
			}
			return {
				[mainAxis]: mainAxisCoord,
				[crossAxis]: crossAxisCoord
			};
		}
	};
};
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size$2 = function(options) {
	if (options === void 0) options = {};
	return {
		name: "size",
		options,
		async fn(state) {
			const { placement, rects, platform, elements } = state;
			const { apply = () => {}, ...detectOverflowOptions } = evaluate$1(options, state);
			const overflow = await platform.detectOverflow(state, detectOverflowOptions);
			const side = getSide(placement);
			const alignment = getAlignment(placement);
			const isYAxis = getSideAxis(placement) === "y";
			const { width, height } = rects.floating;
			let heightSide;
			let widthSide;
			if (side === "top" || side === "bottom") {
				heightSide = side;
				widthSide = alignment === (await (platform.isRTL == null ? void 0 : platform.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
			} else {
				widthSide = side;
				heightSide = alignment === "end" ? "top" : "bottom";
			}
			const maximumClippingHeight = height - overflow.top - overflow.bottom;
			const maximumClippingWidth = width - overflow.left - overflow.right;
			const overflowAvailableHeight = min(height - overflow[heightSide], maximumClippingHeight);
			const overflowAvailableWidth = min(width - overflow[widthSide], maximumClippingWidth);
			const shiftData = state.middlewareData.shift;
			const noShift = !shiftData;
			let availableHeight = overflowAvailableHeight;
			let availableWidth = overflowAvailableWidth;
			if (shiftData != null && shiftData.enabled.x) availableWidth = maximumClippingWidth;
			if (shiftData != null && shiftData.enabled.y) availableHeight = maximumClippingHeight;
			if (noShift && !alignment) {
				if (isYAxis) availableWidth = width - 2 * max(overflow.left, overflow.right);
				else availableHeight = height - 2 * max(overflow.top, overflow.bottom);
			}
			await apply({
				...state,
				availableWidth,
				availableHeight
			});
			const nextDimensions = await platform.getDimensions(elements.floating);
			if (width !== nextDimensions.width || height !== nextDimensions.height) return { reset: { rects: true } };
			return {};
		}
	};
};
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
	return typeof window !== "undefined";
}
function getNodeName(node) {
	if (isNode(node)) return (node.nodeName || "").toLowerCase();
	return "#document";
}
function getWindow(node) {
	var _node$ownerDocument;
	return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
	var _ref;
	return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
	if (!hasWindow()) return false;
	return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
	if (!hasWindow()) return false;
	return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
	if (!hasWindow()) return false;
	return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
	if (!hasWindow() || typeof ShadowRoot === "undefined") return false;
	return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element) {
	const { overflow, overflowX, overflowY, display } = getComputedStyle$1(element);
	return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
	return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
	try {
		if (element.matches(":popover-open")) return true;
	} catch (_e) {}
	try {
		return element.matches(":modal");
	} catch (_e) {
		return false;
	}
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
	const css = isElement(elementOrCss) ? getComputedStyle$1(elementOrCss) : elementOrCss;
	return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
	let currentNode = getParentNode(element);
	while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
		if (isContainingBlock(currentNode)) return currentNode;
		else if (isTopLayer(currentNode)) return null;
		currentNode = getParentNode(currentNode);
	}
	return null;
}
function isWebKit() {
	if (isWebKitValue == null) isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
	return isWebKitValue;
}
function isLastTraversableNode(node) {
	return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle$1(element) {
	return getWindow(element).getComputedStyle(element);
}
function getNodeScroll(element) {
	if (isElement(element)) return {
		scrollLeft: element.scrollLeft,
		scrollTop: element.scrollTop
	};
	return {
		scrollLeft: element.scrollX,
		scrollTop: element.scrollY
	};
}
function getParentNode(node) {
	if (getNodeName(node) === "html") return node;
	const result = node.assignedSlot || node.parentNode || isShadowRoot(node) && node.host || getDocumentElement(node);
	return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
	const parentNode = getParentNode(node);
	if (isLastTraversableNode(parentNode)) return (node.ownerDocument || node).body;
	if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) return parentNode;
	return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
	var _node$ownerDocument2;
	if (list === void 0) list = [];
	if (traverseIframes === void 0) traverseIframes = true;
	const scrollableAncestor = getNearestOverflowAncestor(node);
	const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
	const win = getWindow(scrollableAncestor);
	if (isBody) {
		const frameElement = getFrameElement(win);
		return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
	} else return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
function getFrameElement(win) {
	return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
	const css = getComputedStyle$1(element);
	let width = parseFloat(css.width) || 0;
	let height = parseFloat(css.height) || 0;
	const hasOffset = isHTMLElement(element);
	const offsetWidth = hasOffset ? element.offsetWidth : width;
	const offsetHeight = hasOffset ? element.offsetHeight : height;
	const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
	if (shouldFallback) {
		width = offsetWidth;
		height = offsetHeight;
	}
	return {
		width,
		height,
		$: shouldFallback
	};
}
function unwrapElement(element) {
	return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
	const domElement = unwrapElement(element);
	if (!isHTMLElement(domElement)) return createCoords(1);
	const rect = domElement.getBoundingClientRect();
	const { width, height, $ } = getCssDimensions(domElement);
	let x = ($ ? round(rect.width) : rect.width) / width;
	let y = ($ ? round(rect.height) : rect.height) / height;
	if (!x || !Number.isFinite(x)) x = 1;
	if (!y || !Number.isFinite(y)) y = 1;
	return {
		x,
		y
	};
}
var noOffsets = /*#__PURE__*/ createCoords(0);
function getVisualOffsets(element) {
	const win = getWindow(element);
	if (!isWebKit() || !win.visualViewport) return noOffsets;
	return {
		x: win.visualViewport.offsetLeft,
		y: win.visualViewport.offsetTop
	};
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
	if (isFixed === void 0) isFixed = false;
	return !!floatingOffsetParent && isFixed && floatingOffsetParent === getWindow(element);
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
	if (includeScale === void 0) includeScale = false;
	if (isFixedStrategy === void 0) isFixedStrategy = false;
	const clientRect = element.getBoundingClientRect();
	const domElement = unwrapElement(element);
	let scale = createCoords(1);
	if (includeScale) {
		if (offsetParent) {
			if (isElement(offsetParent)) scale = getScale(offsetParent);
		} else scale = getScale(element);
	}
	const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
	let x = (clientRect.left + visualOffsets.x) / scale.x;
	let y = (clientRect.top + visualOffsets.y) / scale.y;
	let width = clientRect.width / scale.x;
	let height = clientRect.height / scale.y;
	if (domElement && offsetParent) {
		const win = getWindow(domElement);
		const offsetWin = isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
		let currentWin = win;
		let currentIFrame = getFrameElement(currentWin);
		while (currentIFrame && offsetWin !== currentWin) {
			const iframeScale = getScale(currentIFrame);
			const iframeRect = currentIFrame.getBoundingClientRect();
			const css = getComputedStyle$1(currentIFrame);
			const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
			const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
			x *= iframeScale.x;
			y *= iframeScale.y;
			width *= iframeScale.x;
			height *= iframeScale.y;
			x += left;
			y += top;
			currentWin = getWindow(currentIFrame);
			currentIFrame = getFrameElement(currentWin);
		}
	}
	return rectToClientRect({
		width,
		height,
		x,
		y
	});
}
function getWindowScrollBarX(element, rect) {
	const leftScroll = getNodeScroll(element).scrollLeft;
	if (!rect) return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
	return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
	const htmlRect = documentElement.getBoundingClientRect();
	return {
		x: htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect),
		y: htmlRect.top + scroll.scrollTop
	};
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
	let { elements, rect, offsetParent, strategy } = _ref;
	const isFixed = strategy === "fixed";
	const documentElement = getDocumentElement(offsetParent);
	const topLayer = elements ? isTopLayer(elements.floating) : false;
	if (offsetParent === documentElement || topLayer && isFixed) return rect;
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	let scale = createCoords(1);
	const offsets = createCoords(0);
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	if (isOffsetParentAnElement || !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent);
			scale = getScale(offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		width: rect.width * scale.x,
		height: rect.height * scale.y,
		x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
		y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
	};
}
function getClientRects(element) {
	return element.getClientRects ? Array.from(element.getClientRects()) : [];
}
function getDocumentRect(html) {
	const scroll = getNodeScroll(html);
	const body = html.ownerDocument.body;
	const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
	const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
	let x = -scroll.scrollLeft + getWindowScrollBarX(html);
	const y = -scroll.scrollTop;
	if (getComputedStyle$1(body).direction === "rtl") x += max(html.clientWidth, body.clientWidth) - width;
	return {
		width,
		height,
		x,
		y
	};
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy, rootBoundary) {
	if (rootBoundary === void 0) rootBoundary = "viewport";
	const isLayoutViewport = rootBoundary === "layoutViewport";
	const win = getWindow(element);
	const html = getDocumentElement(element);
	const visualViewport = win.visualViewport;
	let width = html.clientWidth;
	let height = html.clientHeight;
	let x = 0;
	let y = 0;
	if (visualViewport) {
		const layoutRelativeClientCoords = !isWebKit() || strategy === "fixed";
		if (isLayoutViewport) {
			if (!layoutRelativeClientCoords) {
				x = -visualViewport.offsetLeft;
				y = -visualViewport.offsetTop;
			}
		} else {
			width = visualViewport.width;
			height = visualViewport.height;
			if (layoutRelativeClientCoords) {
				x = visualViewport.offsetLeft;
				y = visualViewport.offsetTop;
			}
		}
	}
	if (getWindowScrollBarX(html) <= 0) {
		const doc = html.ownerDocument;
		const body = doc.body;
		const bodyStyles = getComputedStyle(body);
		const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
		const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
		const gutter = getComputedStyle(html).scrollbarGutter === "stable both-edges" ? reservedWidth / 2 : reservedWidth;
		if (gutter <= SCROLLBAR_MAX) width -= gutter;
	}
	return {
		width,
		height,
		x,
		y
	};
}
function getInnerBoundingClientRect(element, strategy) {
	const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
	const top = clientRect.top + element.clientTop;
	const left = clientRect.left + element.clientLeft;
	const scale = getScale(element);
	return {
		width: element.clientWidth * scale.x,
		height: element.clientHeight * scale.y,
		x: left * scale.x,
		y: top * scale.y
	};
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
	let rect;
	if (clippingAncestor === "viewport" || clippingAncestor === "layoutViewport") rect = getViewportRect(element, strategy, clippingAncestor);
	else if (clippingAncestor === "document") rect = getDocumentRect(getDocumentElement(element));
	else if (isElement(clippingAncestor)) rect = getInnerBoundingClientRect(clippingAncestor, strategy);
	else {
		const visualOffsets = getVisualOffsets(element);
		rect = {
			x: clippingAncestor.x - visualOffsets.x,
			y: clippingAncestor.y - visualOffsets.y,
			width: clippingAncestor.width,
			height: clippingAncestor.height
		};
	}
	return rectToClientRect(rect);
}
function getClippingElementAncestors(element, cache) {
	const cachedResult = cache.get(element);
	if (cachedResult) return cachedResult;
	let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
	let lastKeptComputedStyle = null;
	const elementIsFixed = getComputedStyle$1(element).position === "fixed";
	let currentNode = elementIsFixed ? getParentNode(element) : element;
	while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
		const computedStyle = getComputedStyle$1(currentNode);
		const currentNodeIsContaining = isContainingBlock(currentNode);
		const lastPosition = lastKeptComputedStyle ? lastKeptComputedStyle.position : elementIsFixed ? "fixed" : "";
		if (!currentNodeIsContaining && (lastPosition === "fixed" || lastPosition === "absolute" && computedStyle.position === "static")) result = result.filter((ancestor) => ancestor !== currentNode);
		else lastKeptComputedStyle = computedStyle;
		currentNode = getParentNode(currentNode);
	}
	cache.set(element, result);
	return result;
}
function getClippingRect(_ref) {
	let { element, boundary, rootBoundary, strategy } = _ref;
	const clippingAncestors = [...boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary), rootBoundary];
	const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
	let top = firstRect.top;
	let right = firstRect.right;
	let bottom = firstRect.bottom;
	let left = firstRect.left;
	for (let i = 1; i < clippingAncestors.length; i++) {
		const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
		top = max(rect.top, top);
		right = min(rect.right, right);
		bottom = min(rect.bottom, bottom);
		left = max(rect.left, left);
	}
	return {
		width: right - left,
		height: bottom - top,
		x: left,
		y: top
	};
}
function getDimensions(element) {
	const { width, height } = getCssDimensions(element);
	return {
		width,
		height
	};
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
	const isOffsetParentAnElement = isHTMLElement(offsetParent);
	const documentElement = getDocumentElement(offsetParent);
	const isFixed = strategy === "fixed";
	const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
	let scroll = {
		scrollLeft: 0,
		scrollTop: 0
	};
	const offsets = createCoords(0);
	if (isOffsetParentAnElement || !isFixed) {
		if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) scroll = getNodeScroll(offsetParent);
		if (isOffsetParentAnElement) {
			const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
			offsets.x = offsetRect.x + offsetParent.clientLeft;
			offsets.y = offsetRect.y + offsetParent.clientTop;
		}
	}
	if (!isOffsetParentAnElement && documentElement) offsets.x = getWindowScrollBarX(documentElement);
	const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
	return {
		x: rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x,
		y: rect.top + scroll.scrollTop - offsets.y - htmlOffset.y,
		width: rect.width,
		height: rect.height
	};
}
function isStaticPositioned(element) {
	return getComputedStyle$1(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
	if (!isHTMLElement(element) || getComputedStyle$1(element).position === "fixed") return null;
	if (polyfill) return polyfill(element);
	let rawOffsetParent = element.offsetParent;
	if (getDocumentElement(element) === rawOffsetParent) rawOffsetParent = rawOffsetParent.ownerDocument.body;
	return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
	const win = getWindow(element);
	if (isTopLayer(element)) return win;
	if (!isHTMLElement(element)) {
		let svgOffsetParent = getParentNode(element);
		while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
			if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) return svgOffsetParent;
			svgOffsetParent = getParentNode(svgOffsetParent);
		}
		return win;
	}
	let offsetParent = getTrueOffsetParent(element, polyfill);
	while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) offsetParent = getTrueOffsetParent(offsetParent, polyfill);
	if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) return win;
	return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
	const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
	const getDimensionsFn = this.getDimensions;
	const floatingDimensions = await getDimensionsFn(data.floating);
	return {
		reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
		floating: {
			x: 0,
			y: 0,
			width: floatingDimensions.width,
			height: floatingDimensions.height
		}
	};
};
function isRTL(element) {
	return getComputedStyle$1(element).direction === "rtl";
}
var platform = {
	convertOffsetParentRelativeRectToViewportRelativeRect,
	getDocumentElement,
	getClippingRect,
	getOffsetParent,
	getElementRects,
	getClientRects,
	getDimensions,
	getScale,
	isElement,
	isRTL
};
function rectsAreEqual(a, b) {
	return a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
}
function observeMove(element, onMove, ancestorResize) {
	let io = null;
	let timeoutId;
	const root = getDocumentElement(element);
	function cleanup() {
		var _io;
		clearTimeout(timeoutId);
		(_io = io) == null || _io.disconnect();
		io = null;
	}
	function refresh(skip, threshold) {
		if (skip === void 0) skip = false;
		if (threshold === void 0) threshold = 1;
		cleanup();
		const elementRectForRootMargin = element.getBoundingClientRect();
		const { left, top, width, height } = elementRectForRootMargin;
		if (!skip) onMove();
		if (!width || !height) return;
		const insetTop = floor(top);
		const insetRight = floor(root.clientWidth - (left + width));
		const insetBottom = floor(root.clientHeight - (top + height));
		const insetLeft = floor(left);
		const options = {
			rootMargin: -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px",
			threshold: max(0, min(1, threshold)) || 1
		};
		let isFirstUpdate = true;
		function handleObserve(entries) {
			const ratio = entries[0].intersectionRatio;
			if (!rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) return refresh();
			if (ratio !== threshold) {
				if (!isFirstUpdate) return refresh();
				if (!ratio) timeoutId = setTimeout(() => {
					refresh(false, 1e-7);
				}, 1e3);
				else refresh(false, ratio);
			}
			isFirstUpdate = false;
		}
		try {
			io = new IntersectionObserver(handleObserve, {
				...options,
				root: root.ownerDocument
			});
		} catch (_e) {
			io = new IntersectionObserver(handleObserve, options);
		}
		io.observe(element);
	}
	const win = getWindow(element);
	const handleResize = () => refresh(ancestorResize);
	win.addEventListener("resize", handleResize);
	refresh(true);
	return () => {
		win.removeEventListener("resize", handleResize);
		cleanup();
	};
}
/**
* Automatically updates the position of the floating element when necessary.
* Should only be called when the floating element is mounted on the DOM or
* visible on the screen.
* @returns cleanup function that should be invoked when the floating element is
* removed from the DOM or hidden from the screen.
* @see https://floating-ui.com/docs/autoUpdate
*/
function autoUpdate(reference, floating, update, options) {
	if (options === void 0) options = {};
	const { ancestorScroll = true, ancestorResize = true, elementResize = typeof ResizeObserver === "function", layoutShift = typeof IntersectionObserver === "function", animationFrame = false } = options;
	const referenceEl = unwrapElement(reference);
	const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
	ancestors.forEach((ancestor) => {
		ancestorScroll && ancestor.addEventListener("scroll", update);
		ancestorResize && ancestor.addEventListener("resize", update);
	});
	const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update, ancestorResize) : null;
	let reobserveFrame = -1;
	let resizeObserver = null;
	if (elementResize) {
		resizeObserver = new ResizeObserver((_ref) => {
			let [firstEntry] = _ref;
			if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
				resizeObserver.unobserve(floating);
				cancelAnimationFrame(reobserveFrame);
				reobserveFrame = requestAnimationFrame(() => {
					var _resizeObserver;
					(_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
				});
			}
			update();
		});
		if (referenceEl && !animationFrame) resizeObserver.observe(referenceEl);
		if (floating) resizeObserver.observe(floating);
	}
	let frameId;
	let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
	if (animationFrame) frameLoop();
	function frameLoop() {
		const nextRefRect = getBoundingClientRect(reference);
		if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) update();
		prevRefRect = nextRefRect;
		frameId = requestAnimationFrame(frameLoop);
	}
	update();
	return () => {
		var _resizeObserver2;
		ancestors.forEach((ancestor) => {
			ancestorScroll && ancestor.removeEventListener("scroll", update);
			ancestorResize && ancestor.removeEventListener("resize", update);
		});
		cleanupIo?.();
		(_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
		resizeObserver = null;
		if (animationFrame) cancelAnimationFrame(frameId);
	};
}
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset$1 = offset$2;
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift$1 = shift$2;
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip$1 = flip$2;
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size$1 = size$2;
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide$1 = hide$2;
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow$2 = arrow$3;
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift$1 = limitShift$2;
/**
* Computes the `x` and `y` coordinates that will place the floating element
* next to a given reference element.
*/
var computePosition = (reference, floating, options) => {
	const cache = /* @__PURE__ */ new Map();
	const mergedOptions = options != null ? options : {};
	const platformWithCache = {
		...platform,
		...mergedOptions.platform,
		_c: cache
	};
	return computePosition$1(reference, floating, {
		...mergedOptions,
		platform: platformWithCache
	});
};
//#endregion
//#region node_modules/@floating-ui/react-dom/dist/floating-ui.react-dom.mjs
var index = typeof document !== "undefined" ? import_react.useLayoutEffect : function noop() {};
function deepEqual(a, b) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (typeof a === "function" && a.toString() === b.toString()) return true;
	let length;
	let i;
	let keys;
	if (a && b && typeof a === "object") {
		if (Array.isArray(a)) {
			length = a.length;
			if (length !== b.length) return false;
			for (i = length; i-- !== 0;) if (!deepEqual(a[i], b[i])) return false;
			return true;
		}
		keys = Object.keys(a);
		length = keys.length;
		if (length !== Object.keys(b).length) return false;
		for (i = length; i-- !== 0;) if (!{}.hasOwnProperty.call(b, keys[i])) return false;
		for (i = length; i-- !== 0;) {
			const key = keys[i];
			if (key === "_owner" && a.$$typeof) continue;
			if (!deepEqual(a[key], b[key])) return false;
		}
		return true;
	}
	return a !== a && b !== b;
}
function getDPR(element) {
	if (typeof window === "undefined") return 1;
	return (element.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function roundByDPR(element, value) {
	const dpr = getDPR(element);
	return Math.round(value * dpr) / dpr;
}
function useLatestRef(value) {
	const ref = import_react.useRef(value);
	index(() => {
		ref.current = value;
	});
	return ref;
}
/**
* Provides data to position a floating element.
* @see https://floating-ui.com/docs/useFloating
*/
function useFloating(options) {
	if (options === void 0) options = {};
	const { placement = "bottom", strategy = "absolute", middleware = [], platform, elements: { reference: externalReference, floating: externalFloating } = {}, transform = true, whileElementsMounted, open } = options;
	const [data, setData] = import_react.useState({
		x: 0,
		y: 0,
		strategy,
		placement,
		middlewareData: {},
		isPositioned: false
	});
	const [latestMiddleware, setLatestMiddleware] = import_react.useState(middleware);
	if (!deepEqual(latestMiddleware, middleware)) setLatestMiddleware(middleware);
	const [_reference, _setReference] = import_react.useState(null);
	const [_floating, _setFloating] = import_react.useState(null);
	const setReference = import_react.useCallback((node) => {
		if (node !== referenceRef.current) {
			referenceRef.current = node;
			_setReference(node);
		}
	}, []);
	const setFloating = import_react.useCallback((node) => {
		if (node !== floatingRef.current) {
			floatingRef.current = node;
			_setFloating(node);
		}
	}, []);
	const referenceEl = externalReference || _reference;
	const floatingEl = externalFloating || _floating;
	const referenceRef = import_react.useRef(null);
	const floatingRef = import_react.useRef(null);
	const dataRef = import_react.useRef(data);
	const hasWhileElementsMounted = whileElementsMounted != null;
	const whileElementsMountedRef = useLatestRef(whileElementsMounted);
	const platformRef = useLatestRef(platform);
	const openRef = useLatestRef(open);
	const update = import_react.useCallback(() => {
		if (!referenceRef.current || !floatingRef.current) return;
		const config = {
			placement,
			strategy,
			middleware: latestMiddleware
		};
		if (platformRef.current) config.platform = platformRef.current;
		computePosition(referenceRef.current, floatingRef.current, config).then((data) => {
			const fullData = {
				...data,
				isPositioned: openRef.current !== false
			};
			if (isMountedRef.current && !deepEqual(dataRef.current, fullData)) {
				dataRef.current = fullData;
				import_react_dom.flushSync(() => {
					setData(fullData);
				});
			}
		});
	}, [
		latestMiddleware,
		placement,
		strategy,
		platformRef,
		openRef
	]);
	index(() => {
		if (open === false && dataRef.current.isPositioned) {
			dataRef.current.isPositioned = false;
			setData((data) => ({
				...data,
				isPositioned: false
			}));
		}
	}, [open]);
	const isMountedRef = import_react.useRef(false);
	index(() => {
		isMountedRef.current = true;
		return () => {
			isMountedRef.current = false;
		};
	}, []);
	index(() => {
		if (referenceEl) referenceRef.current = referenceEl;
		if (floatingEl) floatingRef.current = floatingEl;
		if (referenceEl && floatingEl) {
			if (whileElementsMountedRef.current) return whileElementsMountedRef.current(referenceEl, floatingEl, update);
			update();
		}
	}, [
		referenceEl,
		floatingEl,
		update,
		whileElementsMountedRef,
		hasWhileElementsMounted
	]);
	const refs = import_react.useMemo(() => ({
		reference: referenceRef,
		floating: floatingRef,
		setReference,
		setFloating
	}), [setReference, setFloating]);
	const elements = import_react.useMemo(() => ({
		reference: referenceEl,
		floating: floatingEl
	}), [referenceEl, floatingEl]);
	const floatingStyles = import_react.useMemo(() => {
		const initialStyles = {
			position: strategy,
			left: 0,
			top: 0
		};
		if (!elements.floating) return initialStyles;
		const x = roundByDPR(elements.floating, data.x);
		const y = roundByDPR(elements.floating, data.y);
		if (transform) return {
			...initialStyles,
			transform: "translate(" + x + "px, " + y + "px)",
			...getDPR(elements.floating) >= 1.5 && { willChange: "transform" }
		};
		return {
			position: strategy,
			left: x,
			top: y
		};
	}, [
		strategy,
		transform,
		elements.floating,
		data.x,
		data.y
	]);
	return import_react.useMemo(() => ({
		...data,
		update,
		refs,
		elements,
		floatingStyles
	}), [
		data,
		update,
		refs,
		elements,
		floatingStyles
	]);
}
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* This wraps the core `arrow` middleware to allow React refs as the element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow$1 = (options) => {
	function isRef(value) {
		return {}.hasOwnProperty.call(value, "current");
	}
	return {
		name: "arrow",
		options,
		fn(state) {
			const { element, padding } = typeof options === "function" ? options(state) : options;
			if (element && isRef(element)) {
				if (element.current != null) return arrow$2({
					element: element.current,
					padding
				}).fn(state);
				return {};
			}
			if (element) return arrow$2({
				element,
				padding
			}).fn(state);
			return {};
		}
	};
};
/**
* Modifies the placement by translating the floating element along the
* specified axes.
* A number (shorthand for `mainAxis` or distance), or an axes configuration
* object may be passed.
* @see https://floating-ui.com/docs/offset
*/
var offset = (options, deps) => {
	const result = offset$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Optimizes the visibility of the floating element by shifting it in order to
* keep it in view when it will overflow the clipping boundary.
* @see https://floating-ui.com/docs/shift
*/
var shift = (options, deps) => {
	const result = shift$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Built-in `limiter` that will stop `shift()` at a certain point.
*/
var limitShift = (options, deps) => {
	return {
		fn: limitShift$1(options).fn,
		options: [options, deps]
	};
};
/**
* Optimizes the visibility of the floating element by flipping the `placement`
* in order to keep it in view when the preferred placement(s) will overflow the
* clipping boundary. Alternative to `autoPlacement`.
* @see https://floating-ui.com/docs/flip
*/
var flip = (options, deps) => {
	const result = flip$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Provides data that allows you to change the size of the floating element —
* for instance, prevent it from overflowing the clipping boundary or match the
* width of the reference element.
* @see https://floating-ui.com/docs/size
*/
var size = (options, deps) => {
	const result = size$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Provides data to hide the floating element in applicable situations, such as
* when it is not in the same clipping context as the reference element.
* @see https://floating-ui.com/docs/hide
*/
var hide = (options, deps) => {
	const result = hide$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
/**
* Provides data to position an inner element of the floating element so that it
* appears centered to the reference element.
* This wraps the core `arrow` middleware to allow React refs as the element.
* @see https://floating-ui.com/docs/arrow
*/
var arrow = (options, deps) => {
	const result = arrow$1(options);
	return {
		name: result.name,
		fn: result.fn,
		options: [options, deps]
	};
};
//#endregion
//#region node_modules/@radix-ui/react-arrow/dist/index.mjs
var __defProp$2 = Object.defineProperty;
var __name$2 = (target, value) => __defProp$2(target, "name", {
	value,
	configurable: true
});
var Arrow = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$2(function Arrow2(props, forwardedRef) {
	const { children, width = 10, height = 5, ...arrowProps } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.svg, {
		...arrowProps,
		ref: forwardedRef,
		width,
		height,
		viewBox: "0 0 30 10",
		preserveAspectRatio: "none",
		children: props.asChild ? children : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "0,0 30,0 15,10" })
	});
}, "Arrow"));
//#endregion
//#region node_modules/@radix-ui/react-popper/dist/index.mjs
var __defProp$1 = Object.defineProperty;
var __name$1 = (target, value) => __defProp$1(target, "name", {
	value,
	configurable: true
});
var Sticky = {
	Partial: "partial",
	Always: "always"
};
var UpdatePositionStrategy = {
	Optimized: "optimized",
	Always: "always"
};
var POPPER_NAME = "Popper";
var [createPopperContext, createPopperScope] = /* @__PURE__ */ createContextScope(POPPER_NAME);
var [PopperProvider, usePopperContext] = createPopperContext(POPPER_NAME);
var Popper = /* @__PURE__ */ __name$1((props) => {
	const { __scopePopper, children } = props;
	const [anchor, setAnchor] = import_react.useState(null);
	const [placementState, setPlacementState] = import_react.useState(void 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperProvider, {
		scope: __scopePopper,
		anchor,
		onAnchorChange: setAnchor,
		placementState,
		setPlacementState,
		children
	});
}, "Popper");
var ANCHOR_NAME = "PopperAnchor";
var PopperAnchor = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$1(function PopperAnchor2(props, forwardedRef) {
	const { __scopePopper, virtualRef, ...anchorProps } = props;
	const context = usePopperContext(ANCHOR_NAME, __scopePopper);
	const ref = import_react.useRef(null);
	const onAnchorChange = context.onAnchorChange;
	const composedRefs = useComposedRefs(forwardedRef, import_react.useCallback((node) => {
		ref.current = node;
		if (node) onAnchorChange(node);
	}, [onAnchorChange]));
	const anchorRef = import_react.useRef(null);
	import_react.useEffect(() => {
		if (!virtualRef) return;
		const previousAnchor = anchorRef.current;
		anchorRef.current = virtualRef.current;
		if (previousAnchor !== anchorRef.current) onAnchorChange(anchorRef.current);
	});
	const sideAndAlign = context.placementState && getSideAndAlignFromPlacement(context.placementState);
	const placedSide = sideAndAlign?.[0];
	const placedAlign = sideAndAlign?.[1];
	return virtualRef ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
		"data-radix-popper-side": placedSide,
		"data-radix-popper-align": placedAlign,
		...anchorProps,
		ref: composedRefs
	});
}, "PopperAnchor"));
var CONTENT_NAME$1 = "PopperContent";
var [PopperContentProvider, useContentContext] = createPopperContext(CONTENT_NAME$1);
var PopperContent = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$1(function PopperContent2(props, forwardedRef) {
	const { __scopePopper, side = "bottom", sideOffset = 0, align = "center", alignOffset = 0, arrowPadding = 0, avoidCollisions = true, collisionBoundary = [], collisionPadding: collisionPaddingProp = 0, sticky = Sticky.Partial, hideWhenDetached = false, updatePositionStrategy = UpdatePositionStrategy.Optimized, onPlaced, ...contentProps } = props;
	const context = usePopperContext(CONTENT_NAME$1, __scopePopper);
	const [content, setContent] = import_react.useState(null);
	const composedRefs = useComposedRefs(forwardedRef, setContent);
	const [arrow$4, setArrow] = import_react.useState(null);
	const arrowSize = useSize(arrow$4);
	const arrowWidth = arrowSize?.width ?? 0;
	const arrowHeight = arrowSize?.height ?? 0;
	const desiredPlacement = side + (align !== "center" ? "-" + align : "");
	const collisionPadding = typeof collisionPaddingProp === "number" ? collisionPaddingProp : {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		...collisionPaddingProp
	};
	const boundary = Array.isArray(collisionBoundary) ? collisionBoundary : [collisionBoundary];
	const hasExplicitBoundaries = boundary.length > 0;
	const detectOverflowOptions = {
		padding: collisionPadding,
		boundary: boundary.filter(isNotNull),
		altBoundary: hasExplicitBoundaries
	};
	const { refs, floatingStyles, placement, isPositioned, middlewareData } = useFloating({
		strategy: "fixed",
		placement: desiredPlacement,
		whileElementsMounted: /* @__PURE__ */ __name$1((...args) => {
			return autoUpdate(...args, { animationFrame: updatePositionStrategy === UpdatePositionStrategy.Always });
		}, "whileElementsMounted"),
		elements: { reference: context.anchor },
		middleware: [
			offset({
				mainAxis: sideOffset + arrowHeight,
				alignmentAxis: alignOffset
			}),
			avoidCollisions && shift({
				mainAxis: true,
				crossAxis: false,
				limiter: sticky === Sticky.Partial ? limitShift() : void 0,
				...detectOverflowOptions
			}),
			avoidCollisions && flip({ ...detectOverflowOptions }),
			size({
				...detectOverflowOptions,
				apply: /* @__PURE__ */ __name$1(({ elements, rects, availableWidth, availableHeight }) => {
					const { width: anchorWidth, height: anchorHeight } = rects.reference;
					const contentStyle = elements.floating.style;
					contentStyle.setProperty("--radix-popper-available-width", `${availableWidth}px`);
					contentStyle.setProperty("--radix-popper-available-height", `${availableHeight}px`);
					contentStyle.setProperty("--radix-popper-anchor-width", `${anchorWidth}px`);
					contentStyle.setProperty("--radix-popper-anchor-height", `${anchorHeight}px`);
				}, "apply")
			}),
			arrow$4 && arrow({
				element: arrow$4,
				padding: arrowPadding
			}),
			transformOrigin({
				arrowWidth,
				arrowHeight
			}),
			hideWhenDetached && hide({
				strategy: "referenceHidden",
				...detectOverflowOptions,
				boundary: hasExplicitBoundaries ? detectOverflowOptions.boundary : void 0
			})
		]
	});
	const setPlacementState = context.setPlacementState;
	useLayoutEffect2(() => {
		setPlacementState(placement);
		return () => {
			setPlacementState(void 0);
		};
	}, [placement, setPlacementState]);
	const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
	const handlePlaced = useCallbackRef$1(onPlaced);
	useLayoutEffect2(() => {
		if (isPositioned) handlePlaced?.();
	}, [isPositioned, handlePlaced]);
	const arrowX = middlewareData.arrow?.x;
	const arrowY = middlewareData.arrow?.y;
	const cannotCenterArrow = middlewareData.arrow?.centerOffset !== 0;
	const [contentZIndex, setContentZIndex] = import_react.useState();
	useLayoutEffect2(() => {
		if (content) setContentZIndex(window.getComputedStyle(content).zIndex);
	}, [content]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: refs.setFloating,
		"data-radix-popper-content-wrapper": "",
		style: {
			...floatingStyles,
			transform: isPositioned ? floatingStyles.transform : "translate(0, -200%)",
			minWidth: "max-content",
			zIndex: contentZIndex,
			"--radix-popper-transform-origin": [middlewareData.transformOrigin?.x, middlewareData.transformOrigin?.y].join(" "),
			...middlewareData.hide?.referenceHidden && {
				visibility: "hidden",
				pointerEvents: "none"
			}
		},
		dir: props.dir,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperContentProvider, {
			scope: __scopePopper,
			placedSide,
			placedAlign,
			onArrowChange: setArrow,
			arrowX,
			arrowY,
			shouldHideArrow: cannotCenterArrow,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.div, {
				"data-side": placedSide,
				"data-align": placedAlign,
				...contentProps,
				ref: composedRefs,
				style: {
					...contentProps.style,
					animation: !isPositioned ? "none" : contentProps.style?.animation
				}
			})
		})
	});
}, "PopperContent"));
var ARROW_NAME = "PopperArrow";
var OPPOSITE_SIDE = {
	top: "bottom",
	right: "left",
	bottom: "top",
	left: "right"
};
var PopperArrow = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name$1(function PopperArrow2(props, forwardedRef) {
	const { __scopePopper, ...arrowProps } = props;
	const contentContext = useContentContext(ARROW_NAME, __scopePopper);
	const baseSide = OPPOSITE_SIDE[contentContext.placedSide];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		ref: contentContext.onArrowChange,
		style: {
			position: "absolute",
			left: contentContext.arrowX,
			top: contentContext.arrowY,
			[baseSide]: 0,
			transformOrigin: {
				top: "",
				right: "0 0",
				bottom: "center 0",
				left: "100% 0"
			}[contentContext.placedSide],
			transform: {
				top: "translateY(100%)",
				right: "translateY(50%) rotate(90deg) translateX(-50%)",
				bottom: `rotate(180deg)`,
				left: "translateY(50%) rotate(-90deg) translateX(50%)"
			}[contentContext.placedSide],
			visibility: contentContext.shouldHideArrow ? "hidden" : void 0
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Arrow, {
			...arrowProps,
			ref: forwardedRef,
			style: {
				...arrowProps.style,
				display: "block"
			}
		})
	});
}, "PopperArrow"));
function isNotNull(value) {
	return value !== null;
}
__name$1(isNotNull, "isNotNull");
var transformOrigin = /* @__PURE__ */ __name$1((options) => ({
	name: "transformOrigin",
	options,
	fn(data) {
		const { placement, rects, middlewareData } = data;
		const isArrowHidden = middlewareData.arrow?.centerOffset !== 0;
		const arrowWidth = isArrowHidden ? 0 : options.arrowWidth;
		const arrowHeight = isArrowHidden ? 0 : options.arrowHeight;
		const [placedSide, placedAlign] = getSideAndAlignFromPlacement(placement);
		const noArrowAlign = {
			start: "0%",
			center: "50%",
			end: "100%"
		}[placedAlign];
		const arrowXCenter = (middlewareData.arrow?.x ?? 0) + arrowWidth / 2;
		const arrowYCenter = (middlewareData.arrow?.y ?? 0) + arrowHeight / 2;
		let x = "";
		let y = "";
		if (placedSide === "bottom") {
			x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
			y = `${-arrowHeight}px`;
		} else if (placedSide === "top") {
			x = isArrowHidden ? noArrowAlign : `${arrowXCenter}px`;
			y = `${rects.floating.height + arrowHeight}px`;
		} else if (placedSide === "right") {
			x = `${-arrowHeight}px`;
			y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
		} else if (placedSide === "left") {
			x = `${rects.floating.width + arrowHeight}px`;
			y = isArrowHidden ? noArrowAlign : `${arrowYCenter}px`;
		}
		return { data: {
			x,
			y
		} };
	}
}), "transformOrigin");
function getSideAndAlignFromPlacement(placement) {
	const [side, align = "center"] = placement.split("-");
	return [side, align];
}
__name$1(getSideAndAlignFromPlacement, "getSideAndAlignFromPlacement");
//#endregion
//#region node_modules/@radix-ui/react-tooltip/dist/index.mjs
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", {
	value,
	configurable: true
});
var [createTooltipContext, createTooltipScope] = /* @__PURE__ */ createContextScope("Tooltip", [createPopperScope]);
var usePopperScope = createPopperScope();
var PROVIDER_NAME = "TooltipProvider";
var DEFAULT_DELAY_DURATION = 700;
var TOOLTIP_OPEN = "tooltip.open";
var [TooltipProviderContextProvider, useTooltipProviderContext] = createTooltipContext(PROVIDER_NAME);
var TooltipProvider = /* @__PURE__ */ __name((props) => {
	const { __scopeTooltip, delayDuration = DEFAULT_DELAY_DURATION, skipDelayDuration = 300, disableHoverableContent = false, children } = props;
	const isOpenDelayedRef = import_react.useRef(true);
	const isPointerInTransitRef = import_react.useRef(false);
	const skipDelayTimerRef = import_react.useRef(0);
	import_react.useEffect(() => {
		const skipDelayTimer = skipDelayTimerRef.current;
		return () => window.clearTimeout(skipDelayTimer);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProviderContextProvider, {
		scope: __scopeTooltip,
		isOpenDelayedRef,
		delayDuration,
		onOpen: import_react.useCallback(() => {
			if (skipDelayDuration <= 0) return;
			window.clearTimeout(skipDelayTimerRef.current);
			isOpenDelayedRef.current = false;
		}, [skipDelayDuration]),
		onClose: import_react.useCallback(() => {
			if (skipDelayDuration <= 0) return;
			window.clearTimeout(skipDelayTimerRef.current);
			skipDelayTimerRef.current = window.setTimeout(() => isOpenDelayedRef.current = true, skipDelayDuration);
		}, [skipDelayDuration]),
		isPointerInTransitRef,
		onPointerInTransitChange: import_react.useCallback((inTransit) => {
			isPointerInTransitRef.current = inTransit;
		}, []),
		disableHoverableContent,
		children
	});
}, "TooltipProvider");
var TOOLTIP_NAME = "Tooltip";
var [TooltipContextProvider, useTooltipContext] = createTooltipContext(TOOLTIP_NAME);
var Tooltip = /* @__PURE__ */ __name((props) => {
	const { __scopeTooltip, children, open: openProp, defaultOpen, onOpenChange, disableHoverableContent: disableHoverableContentProp, delayDuration: delayDurationProp } = props;
	const providerContext = useTooltipProviderContext(TOOLTIP_NAME, props.__scopeTooltip);
	const popperScope = usePopperScope(__scopeTooltip);
	const [trigger, setTrigger] = import_react.useState(null);
	const [contentIdState, setContentId] = import_react.useState(void 0);
	const generatedContentId = useId();
	const openTimerRef = import_react.useRef(0);
	const disableHoverableContent = disableHoverableContentProp ?? providerContext.disableHoverableContent;
	const delayDuration = delayDurationProp ?? providerContext.delayDuration;
	const wasOpenDelayedRef = import_react.useRef(false);
	const [open, setOpen] = useControllableState({
		prop: openProp,
		defaultProp: defaultOpen ?? false,
		onChange: /* @__PURE__ */ __name((open2) => {
			if (open2) {
				providerContext.onOpen();
				document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
			} else providerContext.onClose();
			onOpenChange?.(open2);
		}, "onChange"),
		caller: TOOLTIP_NAME
	});
	const stateAttribute = import_react.useMemo(() => {
		return open ? wasOpenDelayedRef.current ? "delayed-open" : "instant-open" : "closed";
	}, [open]);
	const handleOpen = import_react.useCallback(() => {
		window.clearTimeout(openTimerRef.current);
		openTimerRef.current = 0;
		wasOpenDelayedRef.current = false;
		setOpen(true);
	}, [setOpen]);
	const handleClose = import_react.useCallback(() => {
		window.clearTimeout(openTimerRef.current);
		openTimerRef.current = 0;
		setOpen(false);
	}, [setOpen]);
	const handleDelayedOpen = import_react.useCallback(() => {
		window.clearTimeout(openTimerRef.current);
		openTimerRef.current = window.setTimeout(() => {
			wasOpenDelayedRef.current = true;
			setOpen(true);
			openTimerRef.current = 0;
		}, delayDuration);
	}, [delayDuration, setOpen]);
	import_react.useEffect(() => {
		return () => {
			if (openTimerRef.current) {
				window.clearTimeout(openTimerRef.current);
				openTimerRef.current = 0;
			}
		};
	}, []);
	const contentId = contentIdState ?? generatedContentId;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popper, {
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContextProvider, {
			scope: __scopeTooltip,
			contentId,
			setContentId,
			open,
			stateAttribute,
			trigger,
			onTriggerChange: setTrigger,
			onTriggerEnter: import_react.useCallback(() => {
				if (providerContext.isOpenDelayedRef.current) handleDelayedOpen();
				else handleOpen();
			}, [
				providerContext.isOpenDelayedRef,
				handleDelayedOpen,
				handleOpen
			]),
			onTriggerLeave: import_react.useCallback(() => {
				if (disableHoverableContent) handleClose();
				else {
					window.clearTimeout(openTimerRef.current);
					openTimerRef.current = 0;
				}
			}, [handleClose, disableHoverableContent]),
			onOpen: handleOpen,
			onClose: handleClose,
			disableHoverableContent,
			children
		})
	});
}, "Tooltip");
var TRIGGER_NAME = "TooltipTrigger";
var TooltipTrigger = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function TooltipTrigger2(props, forwardedRef) {
	const { __scopeTooltip, "aria-describedby": ariaDescribedby, ...triggerProps } = props;
	const context = useTooltipContext(TRIGGER_NAME, __scopeTooltip);
	const providerContext = useTooltipProviderContext(TRIGGER_NAME, __scopeTooltip);
	const popperScope = usePopperScope(__scopeTooltip);
	const composedRefs = useComposedRefs(forwardedRef, import_react.useRef(null), context.onTriggerChange);
	const isPointerDownRef = import_react.useRef(false);
	const hasPointerMoveOpenedRef = import_react.useRef(false);
	const handlePointerUp = import_react.useCallback(() => isPointerDownRef.current = false, []);
	import_react.useEffect(() => {
		return () => document.removeEventListener("pointerup", handlePointerUp);
	}, [handlePointerUp]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperAnchor, {
		asChild: true,
		...popperScope,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primitive.button, {
			"aria-describedby": context.open ? concatAriaDescribedby(ariaDescribedby, context.contentId) : ariaDescribedby,
			"data-state": context.stateAttribute,
			...triggerProps,
			ref: composedRefs,
			onPointerMove: composeEventHandlers$1(props.onPointerMove, (event) => {
				if (event.pointerType === "touch") return;
				if (!hasPointerMoveOpenedRef.current && !providerContext.isPointerInTransitRef.current) {
					context.onTriggerEnter();
					hasPointerMoveOpenedRef.current = true;
				}
			}),
			onPointerLeave: composeEventHandlers$1(props.onPointerLeave, () => {
				context.onTriggerLeave();
				hasPointerMoveOpenedRef.current = false;
			}),
			onPointerDown: composeEventHandlers$1(props.onPointerDown, () => {
				if (context.open) context.onClose();
				isPointerDownRef.current = true;
				document.addEventListener("pointerup", handlePointerUp, { once: true });
			}),
			onFocus: composeEventHandlers$1(props.onFocus, () => {
				if (!isPointerDownRef.current) context.onOpen();
			}),
			onBlur: composeEventHandlers$1(props.onBlur, context.onClose),
			onClick: composeEventHandlers$1(props.onClick, context.onClose)
		})
	});
}, "TooltipTrigger"));
var [PortalProvider, usePortalContext] = createTooltipContext("TooltipPortal", { forceMount: void 0 });
var CONTENT_NAME = "TooltipContent";
var TooltipContent = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function TooltipContent2(props, forwardedRef) {
	const portalContext = usePortalContext(CONTENT_NAME, props.__scopeTooltip);
	const { forceMount = portalContext.forceMount, side = "top", ...contentProps } = props;
	const context = useTooltipContext(CONTENT_NAME, props.__scopeTooltip);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Presence, {
		present: forceMount || context.open,
		children: context.disableHoverableContent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContentImpl, {
			side,
			...contentProps,
			ref: forwardedRef
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContentHoverable, {
			side,
			...contentProps,
			ref: forwardedRef
		})
	});
}, "TooltipContent"));
var TooltipContentHoverable = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function TooltipContentHoverable2(props, forwardedRef) {
	const context = useTooltipContext(CONTENT_NAME, props.__scopeTooltip);
	const providerContext = useTooltipProviderContext(CONTENT_NAME, props.__scopeTooltip);
	const ref = import_react.useRef(null);
	const composedRefs = useComposedRefs(forwardedRef, ref);
	const [pointerGraceArea, setPointerGraceArea] = import_react.useState(null);
	const { trigger, onClose } = context;
	const content = ref.current;
	const { onPointerInTransitChange } = providerContext;
	const handleRemoveGraceArea = import_react.useCallback(() => {
		setPointerGraceArea(null);
		onPointerInTransitChange(false);
	}, [onPointerInTransitChange]);
	const handleCreateGraceArea = import_react.useCallback((event, hoverTarget) => {
		const currentTarget = event.currentTarget;
		const exitPoint = {
			x: event.clientX,
			y: event.clientY
		};
		const paddedExitPoints = getPaddedExitPoints(exitPoint, getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect()));
		const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
		const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);
		setPointerGraceArea(graceArea);
		onPointerInTransitChange(true);
	}, [onPointerInTransitChange]);
	import_react.useEffect(() => {
		return () => handleRemoveGraceArea();
	}, [handleRemoveGraceArea]);
	import_react.useEffect(() => {
		if (trigger && content) {
			const handleTriggerLeave = /* @__PURE__ */ __name((event) => handleCreateGraceArea(event, content), "handleTriggerLeave");
			const handleContentLeave = /* @__PURE__ */ __name((event) => handleCreateGraceArea(event, trigger), "handleContentLeave");
			trigger.addEventListener("pointerleave", handleTriggerLeave);
			content.addEventListener("pointerleave", handleContentLeave);
			return () => {
				trigger.removeEventListener("pointerleave", handleTriggerLeave);
				content.removeEventListener("pointerleave", handleContentLeave);
			};
		}
	}, [
		trigger,
		content,
		handleCreateGraceArea,
		handleRemoveGraceArea
	]);
	import_react.useEffect(() => {
		if (pointerGraceArea) {
			const handleTrackPointerGrace = /* @__PURE__ */ __name((event) => {
				const target = event.target;
				const pointerPosition = {
					x: event.clientX,
					y: event.clientY
				};
				const hasEnteredTarget = trigger?.contains(target) || content?.contains(target);
				const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea);
				if (hasEnteredTarget) handleRemoveGraceArea();
				else if (isPointerOutsideGraceArea) {
					handleRemoveGraceArea();
					onClose();
				}
			}, "handleTrackPointerGrace");
			document.addEventListener("pointermove", handleTrackPointerGrace);
			return () => document.removeEventListener("pointermove", handleTrackPointerGrace);
		}
	}, [
		trigger,
		content,
		pointerGraceArea,
		onClose,
		handleRemoveGraceArea
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContentImpl, {
		...props,
		ref: composedRefs
	});
}, "TooltipContentHoverable"));
var Slottable = /* @__PURE__ */ createSlottable("TooltipContent");
var TooltipContentImpl = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function TooltipContentImpl2(props, forwardedRef) {
	const { __scopeTooltip, children, "aria-label": ariaLabel, id: idProp, onEscapeKeyDown, onPointerDownOutside, ...contentProps } = props;
	const context = useTooltipContext(CONTENT_NAME, __scopeTooltip);
	const popperScope = usePopperScope(__scopeTooltip);
	const { onClose } = context;
	import_react.useEffect(() => {
		document.addEventListener(TOOLTIP_OPEN, onClose);
		return () => document.removeEventListener(TOOLTIP_OPEN, onClose);
	}, [onClose]);
	import_react.useEffect(() => {
		if (context.trigger) {
			const handleScroll = /* @__PURE__ */ __name((event) => {
				if (event.target instanceof Node && event.target.contains(context.trigger)) onClose();
			}, "handleScroll");
			window.addEventListener("scroll", handleScroll, { capture: true });
			return () => window.removeEventListener("scroll", handleScroll, { capture: true });
		}
	}, [context.trigger, onClose]);
	const { setContentId } = context;
	useLayoutEffect2(() => {
		setContentId(idProp);
		return () => {
			setContentId(void 0);
		};
	}, [idProp, setContentId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissableLayer, {
		asChild: true,
		disableOutsidePointerEvents: false,
		onEscapeKeyDown,
		onPointerDownOutside,
		onFocusOutside: (event) => event.preventDefault(),
		onDismiss: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PopperContent, {
			"data-state": context.stateAttribute,
			role: ariaLabel ? void 0 : "tooltip",
			id: ariaLabel ? void 0 : context.contentId,
			...popperScope,
			...contentProps,
			ref: forwardedRef,
			style: {
				...contentProps.style,
				"--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
				"--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
				"--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
				"--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
				"--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slottable, { children }), ariaLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VisuallyHidden, {
				id: context.contentId,
				role: "tooltip",
				children: ariaLabel
			}) : null]
		})
	});
}, "TooltipContentImpl"));
var TooltipArrow = /* @__PURE__ */ import_react.forwardRef(/* @__PURE__ */ __name(function TooltipArrow2(props, forwardedRef) {
	const { __scopeTooltip, ...arrowProps } = props;
	const popperScope = usePopperScope(__scopeTooltip);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopperArrow, {
		...popperScope,
		...arrowProps,
		ref: forwardedRef
	});
}, "TooltipArrow"));
function getExitSideFromRect(point, rect) {
	const top = Math.abs(rect.top - point.y);
	const bottom = Math.abs(rect.bottom - point.y);
	const right = Math.abs(rect.right - point.x);
	const left = Math.abs(rect.left - point.x);
	switch (Math.min(top, bottom, right, left)) {
		case left: return "left";
		case right: return "right";
		case top: return "top";
		case bottom: return "bottom";
		default: throw new Error("unreachable");
	}
}
__name(getExitSideFromRect, "getExitSideFromRect");
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
	const paddedExitPoints = [];
	switch (exitSide) {
		case "top":
			paddedExitPoints.push({
				x: exitPoint.x - padding,
				y: exitPoint.y + padding
			}, {
				x: exitPoint.x + padding,
				y: exitPoint.y + padding
			});
			break;
		case "bottom":
			paddedExitPoints.push({
				x: exitPoint.x - padding,
				y: exitPoint.y - padding
			}, {
				x: exitPoint.x + padding,
				y: exitPoint.y - padding
			});
			break;
		case "left":
			paddedExitPoints.push({
				x: exitPoint.x + padding,
				y: exitPoint.y - padding
			}, {
				x: exitPoint.x + padding,
				y: exitPoint.y + padding
			});
			break;
		case "right": paddedExitPoints.push({
			x: exitPoint.x - padding,
			y: exitPoint.y - padding
		}, {
			x: exitPoint.x - padding,
			y: exitPoint.y + padding
		});
	}
	return paddedExitPoints;
}
__name(getPaddedExitPoints, "getPaddedExitPoints");
function getPointsFromRect(rect) {
	const { top, right, bottom, left } = rect;
	return [
		{
			x: left,
			y: top
		},
		{
			x: right,
			y: top
		},
		{
			x: right,
			y: bottom
		},
		{
			x: left,
			y: bottom
		}
	];
}
__name(getPointsFromRect, "getPointsFromRect");
function isPointInPolygon(point, polygon) {
	const { x, y } = point;
	let inside = false;
	for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		const ii = polygon[i];
		const jj = polygon[j];
		const xi = ii.x;
		const yi = ii.y;
		const xj = jj.x;
		const yj = jj.y;
		if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
	}
	return inside;
}
__name(isPointInPolygon, "isPointInPolygon");
function getHull(points) {
	const newPoints = points.slice();
	newPoints.sort((a, b) => {
		if (a.x < b.x) return -1;
		else if (a.x > b.x) return 1;
		else if (a.y < b.y) return -1;
		else if (a.y > b.y) return 1;
		else return 0;
	});
	return getHullPresorted(newPoints);
}
__name(getHull, "getHull");
function getHullPresorted(points) {
	if (points.length <= 1) return points.slice();
	const upperHull = [];
	for (let i = 0; i < points.length; i++) {
		const p = points[i];
		while (upperHull.length >= 2) {
			const q = upperHull[upperHull.length - 1];
			const r = upperHull[upperHull.length - 2];
			if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
			else break;
		}
		upperHull.push(p);
	}
	upperHull.pop();
	const lowerHull = [];
	for (let i = points.length - 1; i >= 0; i--) {
		const p = points[i];
		while (lowerHull.length >= 2) {
			const q = lowerHull[lowerHull.length - 1];
			const r = lowerHull[lowerHull.length - 2];
			if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
			else break;
		}
		lowerHull.push(p);
	}
	lowerHull.pop();
	if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) return upperHull;
	else return upperHull.concat(lowerHull);
}
__name(getHullPresorted, "getHullPresorted");
function concatAriaDescribedby(...values) {
	const ids = /* @__PURE__ */ new Set();
	for (const value of values) {
		if (typeof value !== "string") continue;
		for (const id of String(value).trim().split(/\s+/)) if (id) ids.add(id);
	}
	return ids.size > 0 ? Array.from(ids).join(" ") : void 0;
}
__name(concatAriaDescribedby, "concatAriaDescribedby");
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/confirm-dialog.js
function WarningTriangle({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"aria-hidden": true,
		className,
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 2,
		viewBox: "0 0 24 24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m10.29 3.86-8.16 14a2 2 0 0 0 1.73 3h16.28a2 2 0 0 0 1.73-3l-8.16-14a2 2 0 0 0-3.46 0z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "12",
				x2: "12",
				y1: "9",
				y2: "13"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "12",
				x2: "12.01",
				y1: "17",
				y2: "17"
			})
		]
	});
}
function ConfirmDialog({ cancelLabel = "Cancel", confirmLabel = "Confirm", description, destructive = false, loading = false, onCancel, onConfirm, open, title }) {
	const confirmedRef = (0, import_react.useRef)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
		onOpenChange: (v) => {
			if (!v && !confirmedRef.current) onCancel();
			confirmedRef.current = false;
		},
		open,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, { className: cn("fixed inset-0 z-50", "bg-black/60 backdrop-blur-sm", "data-[state=open]:animate-in data-[state=open]:fade-in-0", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
			className: cn("fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2", "w-[calc(100%-2rem)] max-w-md", "border border-midground/15 bg-background-base text-foreground-base shadow-lg outline-none", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", "duration-150"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3 p-4 border-b border-midground/15",
				children: [destructive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "mt-0.5 shrink-0 text-destructive",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WarningTriangle, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0 flex flex-col gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
						className: "font-expanded text-sm font-bold tracking-[0.08em] uppercase",
						children: title
					}), description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, {
						className: "font-mondwest text-xs text-midground/60 leading-relaxed",
						children: description
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-end gap-2 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						disabled: loading,
						outlined: true,
						type: "button",
						children: cancelLabel
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						destructive,
						disabled: loading,
						onClick: () => {
							confirmedRef.current = true;
							onConfirm();
						},
						type: "button",
						children: loading ? "…" : confirmLabel
					})
				})]
			})]
		})] })
	});
}
//#endregion
//#region node_modules/@nous-research/ui/dist/hooks/use-below-breakpoint.js
function useBelowBreakpoint(px) {
	const query = `(max-width: ${px - 1}px)`;
	const [matches, setMatches] = (0, import_react.useState)(() => typeof window !== "undefined" ? window.matchMedia(query).matches : false);
	(0, import_react.useEffect)(() => {
		const mql = window.matchMedia(query);
		const sync = () => setMatches(mql.matches);
		sync();
		mql.addEventListener("change", sync);
		return () => mql.removeEventListener("change", sync);
	}, [query]);
	return matches;
}
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/select.js
var TRIGGER_CN = "flex h-9 w-full items-center justify-between gap-2 border border-midground/15 bg-background/40 px-3 py-1 font-courier text-sm text-left text-midground transition-colors hover:border-midground/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground/30 focus-visible:border-midground/30 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer";
var LISTBOX_CN = "absolute z-50 mt-1 w-full max-h-60 overflow-auto border border-midground/15 bg-background-base text-midground shadow-lg";
function Select$1({ children, className, disabled, id, onValueChange, placeholder, style, value }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [highlightedIndex, setHighlightedIndex] = (0, import_react.useState)(-1);
	const containerRef = (0, import_react.useRef)(null);
	const listRef = (0, import_react.useRef)(null);
	const options = (0, import_react.useMemo)(() => collectOptions(children), [children]);
	const selected = options.find((o) => o.value === value);
	const displayLabel = selected?.label ?? placeholder ?? value ?? "";
	const close = (0, import_react.useCallback)(() => {
		setOpen(false);
		setHighlightedIndex(-1);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const ac = new AbortController();
		document.addEventListener("mousedown", (e) => {
			if (!containerRef.current?.contains(e.target)) close();
		}, { signal: ac.signal });
		return () => ac.abort();
	}, [open, close]);
	(0, import_react.useEffect)(() => {
		if (!open || highlightedIndex < 0) return;
		(listRef.current?.children[highlightedIndex])?.scrollIntoView({ block: "nearest" });
	}, [open, highlightedIndex]);
	const handleKeyDown = (e) => {
		if (disabled) return;
		switch (e.key) {
			case "Enter":
			case " ":
				e.preventDefault();
				if (!open) {
					setOpen(true);
					setHighlightedIndex(options.findIndex((o) => o.value === value));
				} else if (highlightedIndex >= 0 && options[highlightedIndex]) {
					onValueChange?.(options[highlightedIndex].value);
					close();
				}
				break;
			case "ArrowDown":
				e.preventDefault();
				if (!open) {
					setOpen(true);
					setHighlightedIndex(options.findIndex((o) => o.value === value));
				} else setHighlightedIndex((i) => Math.min(i + 1, options.length - 1));
				break;
			case "ArrowUp":
				e.preventDefault();
				if (open) setHighlightedIndex((i) => Math.max(i - 1, 0));
				break;
			case "Home":
				if (open) {
					e.preventDefault();
					setHighlightedIndex(0);
				}
				break;
			case "End":
				if (open) {
					e.preventDefault();
					setHighlightedIndex(options.length - 1);
				}
				break;
			case "Escape":
				e.preventDefault();
				close();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative", className),
		id,
		ref: containerRef,
		style,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			"aria-expanded": open,
			"aria-haspopup": "listbox",
			className: TRIGGER_CN,
			disabled,
			onClick: () => !disabled && setOpen((o) => !o),
			onKeyDown: handleKeyDown,
			role: "combobox",
			type: "button",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("truncate", !selected && "text-midground/50"),
				children: displayLabel
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDownGlyph, { className: cn("size-3 shrink-0 text-midground/60 transition-transform", open && "rotate-180") })]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: LISTBOX_CN,
			ref: listRef,
			role: "listbox",
			children: options.map((opt, i) => {
				const isSelected = opt.value === value;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					"aria-selected": isSelected,
					className: cn("flex cursor-pointer items-center gap-2 px-3 py-2", "font-courier text-sm transition-colors", i === highlightedIndex && "bg-midground/10", isSelected ? "text-midground" : "text-midground/70"),
					onClick: () => {
						onValueChange?.(opt.value);
						close();
					},
					onMouseEnter: () => setHighlightedIndex(i),
					role: "option",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckGlyph, { className: cn("size-3 shrink-0", isSelected ? "opacity-100" : "opacity-0") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: opt.label
					})]
				}, opt.value);
			})
		})]
	});
}
function SelectOption(_props) {
	return null;
}
var ChevronDownGlyph = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"aria-hidden": true,
	className,
	fill: "none",
	stroke: "currentColor",
	strokeLinecap: "square",
	strokeWidth: 1.5,
	viewBox: "0 0 12 12",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2.5 4.5 6 8l3.5-3.5" })
});
var CheckGlyph = ({ className }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
	"aria-hidden": true,
	className,
	fill: "none",
	stroke: "currentColor",
	strokeLinecap: "square",
	strokeWidth: 1.5,
	viewBox: "0 0 12 12",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m2.5 6.5 2.5 2.5L9.5 3.5" })
});
function collectOptions(children) {
	const out = [];
	import_react.Children.forEach(children, (child) => {
		if (!(0, import_react.isValidElement)(child)) return;
		const el = child;
		if (el.props.value !== void 0) out.push({
			label: typeof el.props.children === "string" ? el.props.children : String(el.props.value),
			value: String(el.props.value)
		});
		else if (el.props.children) out.push(...collectOptions(el.props.children));
	});
	return out;
}
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/bottom-sheet.js
var CLOSE_DRAG_MIN_PX = 72;
var CLOSE_DRAG_RATIO = .18;
var SHEET_TRANSITION_MS = 280;
function BottomSheet({ backdropDismissLabel = "Dismiss", children, onClose, open, title }) {
	const [renderPortal, setRenderPortal] = (0, import_react.useState)(open);
	const [entered, setEntered] = (0, import_react.useState)(false);
	const [dragOffsetPx, setDragOffsetPx] = (0, import_react.useState)(0);
	const [dragActive, setDragActive] = (0, import_react.useState)(false);
	const closeTimerRef = (0, import_react.useRef)(null);
	const sheetRef = (0, import_react.useRef)(null);
	const dragTrackingRef = (0, import_react.useRef)(false);
	const dragStartYRef = (0, import_react.useRef)(0);
	const dragOffsetRef = (0, import_react.useRef)(0);
	const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const syncDragPx = (next) => {
		dragOffsetRef.current = next;
		setDragOffsetPx(next);
	};
	(0, import_react.useEffect)(() => {
		if (closeTimerRef.current) {
			clearTimeout(closeTimerRef.current);
			closeTimerRef.current = null;
		}
		const ms = reducedMotion ? 0 : SHEET_TRANSITION_MS;
		let openRafId = 0;
		let exitRafId = 0;
		if (open) openRafId = requestAnimationFrame(() => {
			dragTrackingRef.current = false;
			dragOffsetRef.current = 0;
			setDragActive(false);
			setDragOffsetPx(0);
			setRenderPortal(true);
			requestAnimationFrame(() => {
				requestAnimationFrame(() => setEntered(true));
			});
		});
		else exitRafId = requestAnimationFrame(() => {
			dragTrackingRef.current = false;
			setDragActive(false);
			setEntered(false);
			closeTimerRef.current = window.setTimeout(() => {
				dragOffsetRef.current = 0;
				setDragOffsetPx(0);
				setRenderPortal(false);
				closeTimerRef.current = null;
			}, ms);
		});
		return () => {
			cancelAnimationFrame(openRafId);
			cancelAnimationFrame(exitRafId);
			if (closeTimerRef.current) {
				clearTimeout(closeTimerRef.current);
				closeTimerRef.current = null;
			}
		};
	}, [open, reducedMotion]);
	(0, import_react.useEffect)(() => {
		if (!renderPortal) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [renderPortal]);
	if (!renderPortal || typeof document === "undefined") return null;
	const durationClass = reducedMotion ? "duration-0" : "duration-[280ms]";
	const draggingVisual = dragActive || dragOffsetPx > 0;
	const onDragPointerDown = (e) => {
		if (reducedMotion || !entered) return;
		if (e.pointerType === "mouse" && e.button !== 0) return;
		dragTrackingRef.current = true;
		setDragActive(true);
		dragStartYRef.current = e.clientY;
		syncDragPx(0);
		e.currentTarget.setPointerCapture(e.pointerId);
	};
	const onDragPointerMove = (e) => {
		if (!dragTrackingRef.current) return;
		const dy = e.clientY - dragStartYRef.current;
		const next = Math.max(0, dy);
		const sheetH = sheetRef.current?.offsetHeight ?? 560;
		syncDragPx(Math.min(next, sheetH));
	};
	const endDrag = (e) => {
		if (!dragTrackingRef.current) return;
		dragTrackingRef.current = false;
		setDragActive(false);
		try {
			e.currentTarget.releasePointerCapture(e.pointerId);
		} catch {}
		const sheetH = sheetRef.current?.offsetHeight ?? 560;
		const threshold = Math.max(CLOSE_DRAG_MIN_PX, sheetH * CLOSE_DRAG_RATIO);
		if (dragOffsetRef.current >= threshold) {
			onClose();
			return;
		}
		syncDragPx(0);
	};
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[200] flex flex-col justify-end",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			"aria-label": backdropDismissLabel,
			className: cn("absolute inset-0 bg-black/55 backdrop-blur-[2px]", "transition-opacity ease-out motion-reduce:transition-none", durationClass, entered ? "opacity-100" : "opacity-0"),
			onClick: onClose,
			type: "button"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			"aria-label": title,
			"aria-modal": "true",
			className: cn("relative flex max-h-[85dvh] min-h-0 flex-col rounded-t-xl border border-current/20", "bg-background-base/98 pb-[max(1rem,env(safe-area-inset-bottom))]", "shadow-[0_-12px_40px_-8px_rgba(0,0,0,0.55)] backdrop-blur-md", "ease-out motion-reduce:transition-none transform-gpu", draggingVisual ? "transition-none" : cn("transition-transform", durationClass), entered ? "translate-y-0" : "translate-y-full"),
			ref: sheetRef,
			role: "dialog",
			style: entered && dragOffsetPx > 0 ? { transform: `translateY(${dragOffsetPx}px)` } : void 0,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("flex shrink-0 flex-col gap-2 border-b border-current/15 px-4 pb-3 pt-2", "touch-none select-none", reducedMotion ? "cursor-default" : "cursor-grab active:cursor-grabbing"),
				onPointerCancel: endDrag,
				onPointerDown: onDragPointerDown,
				onPointerMove: onDragPointerMove,
				onPointerUp: endDrag,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "mx-auto h-1 w-10 shrink-0 rounded-full bg-current/20"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
					className: "text-[0.65rem] tracking-[0.15em] uppercase text-midground/70",
					mondwest: true,
					children: title
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto overscroll-contain",
				children
			})]
		})]
	}), document.body);
}
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/list-item.js
var ListItem = (0, import_react.forwardRef)(function ListItem2({ active = false, children, className, type = "button", ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn("group relative flex w-full items-center gap-2 px-3 py-2 text-left", "font-courier text-sm transition-colors cursor-pointer", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground/30", "disabled:cursor-not-allowed disabled:text-text-disabled", active ? "bg-midground/10 text-midground" : "text-text-secondary hover:text-midground hover:bg-midground/5", className),
		"data-active": active || void 0,
		ref,
		type,
		...props,
		children
	});
});
//#endregion
//#region node_modules/nanostores/atom/index.js
var listenerQueue = [];
var lqIndex = 0;
var batchSeen = null;
var QUEUE_ITEMS_PER_LISTENER = 4;
var nanostoresGlobal = globalThis.nanostoresGlobal ||= { epoch: 0 };
var drainQueue = () => {
	for (lqIndex = 0; lqIndex < listenerQueue.length; lqIndex += QUEUE_ITEMS_PER_LISTENER) listenerQueue[lqIndex](listenerQueue[lqIndex + 1].value, listenerQueue[lqIndex + 2], listenerQueue[lqIndex + 3]);
	listenerQueue.length = 0;
};
var atom = /* @__NO_SIDE_EFFECTS__ */ (initialValue) => {
	let listeners = [];
	let $atom = {
		get() {
			if (!$atom.lc) $atom.listen(() => {})();
			return $atom.value;
		},
		init: initialValue,
		lc: 0,
		listen(listener) {
			$atom.lc = listeners.push(listener);
			return () => {
				for (let i = lqIndex + QUEUE_ITEMS_PER_LISTENER; i < listenerQueue.length;) if (listenerQueue[i] === listener) listenerQueue.splice(i, QUEUE_ITEMS_PER_LISTENER);
				else i += QUEUE_ITEMS_PER_LISTENER;
				let index = listeners.indexOf(listener);
				if (~index) {
					listeners.splice(index, 1);
					if (!--$atom.lc) $atom.off();
				}
			};
		},
		notify(oldValue, changedKey) {
			nanostoresGlobal.epoch++;
			let runListenerQueue = !listenerQueue.length && !batchSeen;
			for (let listener of listeners) {
				if (batchSeen?.has(listener)) continue;
				batchSeen?.add(listener);
				listenerQueue.push(listener, $atom, oldValue, batchSeen ? void 0 : changedKey);
			}
			if (runListenerQueue) drainQueue();
		},
		off() {},
		set(newValue) {
			let oldValue = $atom.value;
			if (oldValue !== newValue) {
				$atom.value = newValue;
				$atom.notify(oldValue);
			}
		},
		subscribe(listener) {
			let unbind = $atom.listen(listener);
			listener($atom.value);
			return unbind;
		},
		value: initialValue
	};
	return $atom;
};
//#endregion
//#region node_modules/nanostores/listen-keys/index.js
function listenKeys($store, keys, listener) {
	let keysSet = new Set(keys);
	return $store.listen((value, oldValue, changed) => {
		if (changed === void 0 ? keys.some((key) => value[key] !== oldValue[key]) : keysSet.has(changed) || keysSet.has(changed.split(/\.|\[/)[0])) listener(value, oldValue, changed);
	});
}
//#endregion
//#region node_modules/@nanostores/react/index.js
var emit = (snapshotRef, onChange) => (value) => {
	if (snapshotRef.current === value) return;
	snapshotRef.current = value;
	onChange();
};
function useStore(store, { keys, deps = [store, keys], ssr } = {}) {
	let snapshotRef = (0, import_react.useRef)();
	snapshotRef.current = store.get();
	let subscribe = (0, import_react.useCallback)((onChange) => {
		emit(snapshotRef, onChange)(store.value);
		return keys?.length > 0 ? listenKeys(store, keys, emit(snapshotRef, onChange)) : store.listen(emit(snapshotRef, onChange));
	}, deps);
	let get = () => snapshotRef.current;
	let server = get;
	if (ssr && "init" in store) server = ssr === "initial" ? () => store.init : ssr;
	return (0, import_react.useSyncExternalStore)(subscribe, get, server);
}
//#endregion
//#region node_modules/dequal/lite/index.mjs
var has = Object.prototype.hasOwnProperty;
function dequal(foo, bar) {
	var ctor, len;
	if (foo === bar) return true;
	if (foo && bar && (ctor = foo.constructor) === bar.constructor) {
		if (ctor === Date) return foo.getTime() === bar.getTime();
		if (ctor === RegExp) return foo.toString() === bar.toString();
		if (ctor === Array) {
			if ((len = foo.length) === bar.length) while (len-- && dequal(foo[len], bar[len]));
			return len === -1;
		}
		if (!ctor || typeof foo === "object") {
			len = 0;
			for (ctor in foo) {
				if (has.call(foo, ctor) && ++len && !has.call(bar, ctor)) return false;
				if (!(ctor in bar) || !dequal(foo[ctor], bar[ctor])) return false;
			}
			return Object.keys(bar).length === len;
		}
	}
	return foo !== foo && bar !== bar;
}
//#endregion
//#region node_modules/leva/node_modules/zustand/esm/shallow.js
function shallow(objA, objB) {
	if (Object.is(objA, objB)) return true;
	if (typeof objA !== "object" || objA === null || typeof objB !== "object" || objB === null) return false;
	const keysA = Object.keys(objA);
	if (keysA.length !== Object.keys(objB).length) return false;
	for (let i = 0; i < keysA.length; i++) if (!Object.prototype.hasOwnProperty.call(objB, keysA[i]) || !Object.is(objA[keysA[i]], objB[keysA[i]])) return false;
	return true;
}
//#endregion
//#region node_modules/v8n/dist/v8n.esm.js
var Rule = function Rule(name, fn, args, modifiers) {
	this.name = name;
	this.fn = fn;
	this.args = args;
	this.modifiers = modifiers;
};
Rule.prototype._test = function _test(value) {
	var fn = this.fn;
	try {
		testAux(this.modifiers.slice(), fn, this)(value);
	} catch (ex) {
		fn = function() {
			return false;
		};
	}
	try {
		return testAux(this.modifiers.slice(), fn, this)(value);
	} catch (ex$1) {
		return false;
	}
};
Rule.prototype._check = function _check(value) {
	try {
		testAux(this.modifiers.slice(), this.fn, this)(value);
	} catch (ex) {
		if (testAux(this.modifiers.slice(), function(it) {
			return it;
		}, this)(false)) return;
	}
	if (!testAux(this.modifiers.slice(), this.fn, this)(value)) throw null;
};
Rule.prototype._testAsync = function _testAsync(value) {
	var this$1 = this;
	return new Promise(function(resolve, reject) {
		testAsyncAux(this$1.modifiers.slice(), this$1.fn, this$1)(value).then(function(valid) {
			if (valid) resolve(value);
			else reject(null);
		}).catch(function(ex) {
			return reject(ex);
		});
	});
};
function pickFn(fn, variant) {
	if (variant === void 0) variant = "simple";
	return typeof fn === "object" ? fn[variant] : fn;
}
function testAux(modifiers, fn, rule) {
	if (modifiers.length) {
		var modifier = modifiers.shift();
		var nextFn = testAux(modifiers, fn, rule);
		return modifier.perform(nextFn, rule);
	} else return pickFn(fn);
}
function testAsyncAux(modifiers, fn, rule) {
	if (modifiers.length) {
		var modifier = modifiers.shift();
		var nextFn = testAsyncAux(modifiers, fn, rule);
		return modifier.performAsync(nextFn, rule);
	} else return function(value) {
		return Promise.resolve(pickFn(fn, "async")(value));
	};
}
var Modifier = function Modifier(name, perform, performAsync) {
	this.name = name;
	this.perform = perform;
	this.performAsync = performAsync;
};
var ValidationError = /* @__PURE__ */ function(Error) {
	function ValidationError(rule, value, cause, target) {
		var remaining = [], len = arguments.length - 4;
		while (len-- > 0) remaining[len] = arguments[len + 4];
		Error.call(this, remaining);
		if (Error.captureStackTrace) Error.captureStackTrace(this, ValidationError);
		this.rule = rule;
		this.value = value;
		this.cause = cause;
		this.target = target;
	}
	if (Error) ValidationError.__proto__ = Error;
	ValidationError.prototype = Object.create(Error && Error.prototype);
	ValidationError.prototype.constructor = ValidationError;
	return ValidationError;
}(Error);
var Context = function Context(chain, nextRuleModifiers) {
	if (chain === void 0) chain = [];
	if (nextRuleModifiers === void 0) nextRuleModifiers = [];
	this.chain = chain;
	this.nextRuleModifiers = nextRuleModifiers;
};
Context.prototype._applyRule = function _applyRule(ruleFn, name) {
	var this$1 = this;
	return function() {
		var args = [], len = arguments.length;
		while (len--) args[len] = arguments[len];
		this$1.chain.push(new Rule(name, ruleFn.apply(this$1, args), args, this$1.nextRuleModifiers));
		this$1.nextRuleModifiers = [];
		return this$1;
	};
};
Context.prototype._applyModifier = function _applyModifier(modifier, name) {
	this.nextRuleModifiers.push(new Modifier(name, modifier.simple, modifier.async));
	return this;
};
Context.prototype._clone = function _clone() {
	return new Context(this.chain.slice(), this.nextRuleModifiers.slice());
};
Context.prototype.test = function test(value) {
	return this.chain.every(function(rule) {
		return rule._test(value);
	});
};
Context.prototype.testAll = function testAll(value) {
	var err = [];
	this.chain.forEach(function(rule) {
		try {
			rule._check(value);
		} catch (ex) {
			err.push(new ValidationError(rule, value, ex));
		}
	});
	return err;
};
Context.prototype.check = function check(value) {
	this.chain.forEach(function(rule) {
		try {
			rule._check(value);
		} catch (ex) {
			throw new ValidationError(rule, value, ex);
		}
	});
};
Context.prototype.testAsync = function testAsync(value) {
	var this$1 = this;
	return new Promise(function(resolve, reject) {
		executeAsyncRules(value, this$1.chain.slice(), resolve, reject);
	});
};
function executeAsyncRules(value, rules, resolve, reject) {
	if (rules.length) {
		var rule = rules.shift();
		rule._testAsync(value).then(function() {
			executeAsyncRules(value, rules, resolve, reject);
		}, function(cause) {
			reject(new ValidationError(rule, value, cause));
		});
	} else resolve(value);
}
var consideredEmpty = function(value, considerTrimmedEmptyString) {
	if (considerTrimmedEmptyString && typeof value === "string" && value.trim().length === 0) return true;
	return value === void 0 || value === null;
};
function optional(validation, considerTrimmedEmptyString) {
	if (considerTrimmedEmptyString === void 0) considerTrimmedEmptyString = false;
	return {
		simple: function(value) {
			return consideredEmpty(value, considerTrimmedEmptyString) || validation.check(value) === void 0;
		},
		async: function(value) {
			return consideredEmpty(value, considerTrimmedEmptyString) || validation.testAsync(value);
		}
	};
}
function v8n() {
	return typeof Proxy !== "undefined" ? proxyContext(new Context()) : proxylessContext(new Context());
}
var customRules = {};
v8n.extend = function(newRules) {
	Object.assign(customRules, newRules);
};
v8n.clearCustomRules = function() {
	customRules = {};
};
function proxyContext(context) {
	return new Proxy(context, { get: function get(obj, prop) {
		if (prop in obj) return obj[prop];
		var newContext = proxyContext(context._clone());
		if (prop in availableModifiers) return newContext._applyModifier(availableModifiers[prop], prop);
		if (prop in customRules) return newContext._applyRule(customRules[prop], prop);
		if (prop in availableRules) return newContext._applyRule(availableRules[prop], prop);
	} });
}
function proxylessContext(context) {
	var addRuleSet = function(ruleSet, targetContext) {
		Object.keys(ruleSet).forEach(function(prop) {
			targetContext[prop] = function() {
				var args = [], len = arguments.length;
				while (len--) args[len] = arguments[len];
				return proxylessContext(targetContext._clone())._applyRule(ruleSet[prop], prop).apply(void 0, args);
			};
		});
		return targetContext;
	};
	var contextWithAvailableRules = addRuleSet(availableRules, context);
	var contextWithAllRules = addRuleSet(customRules, contextWithAvailableRules);
	Object.keys(availableModifiers).forEach(function(prop) {
		Object.defineProperty(contextWithAllRules, prop, { get: function() {
			return proxylessContext(contextWithAllRules._clone())._applyModifier(availableModifiers[prop], prop);
		} });
	});
	return contextWithAllRules;
}
var availableModifiers = {
	not: {
		simple: function(fn) {
			return function(value) {
				return !fn(value);
			};
		},
		async: function(fn) {
			return function(value) {
				return Promise.resolve(fn(value)).then(function(result) {
					return !result;
				}).catch(function() {
					return true;
				});
			};
		}
	},
	some: {
		simple: function(fn) {
			return function(value) {
				return split(value).some(function(item) {
					try {
						return fn(item);
					} catch (ex) {
						return false;
					}
				});
			};
		},
		async: function(fn) {
			return function(value) {
				return Promise.all(split(value).map(function(item) {
					try {
						return fn(item).catch(function() {
							return false;
						});
					} catch (ex) {
						return false;
					}
				})).then(function(result) {
					return result.some(Boolean);
				});
			};
		}
	},
	every: {
		simple: function(fn) {
			return function(value) {
				return value !== false && split(value).every(fn);
			};
		},
		async: function(fn) {
			return function(value) {
				return Promise.all(split(value).map(fn)).then(function(result) {
					return result.every(Boolean);
				});
			};
		}
	},
	strict: {
		simple: function(fn, rule) {
			return function(value) {
				if (isSchemaRule(rule) && value && typeof value === "object") return Object.keys(rule.args[0]).length === Object.keys(value).length && fn(value);
				return fn(value);
			};
		},
		async: function(fn, rule) {
			return function(value) {
				return Promise.resolve(fn(value)).then(function(result) {
					if (isSchemaRule(rule) && value && typeof value === "object") return Object.keys(rule.args[0]).length === Object.keys(value).length && result;
					return result;
				}).catch(function() {
					return false;
				});
			};
		}
	}
};
function isSchemaRule(rule) {
	return rule && rule.name === "schema" && rule.args.length > 0 && typeof rule.args[0] === "object";
}
function split(value) {
	if (typeof value === "string") return value.split("");
	return value;
}
var availableRules = {
	equal: function(expected) {
		return function(value) {
			return value == expected;
		};
	},
	exact: function(expected) {
		return function(value) {
			return value === expected;
		};
	},
	number: function(allowInfinite) {
		if (allowInfinite === void 0) allowInfinite = true;
		return function(value) {
			return typeof value === "number" && (allowInfinite || isFinite(value));
		};
	},
	integer: function() {
		return function(value) {
			return (Number.isInteger || isIntegerPolyfill)(value);
		};
	},
	numeric: function() {
		return function(value) {
			return !isNaN(parseFloat(value)) && isFinite(value);
		};
	},
	string: function() {
		return testType("string");
	},
	boolean: function() {
		return testType("boolean");
	},
	undefined: function() {
		return testType("undefined");
	},
	null: function() {
		return testType("null");
	},
	array: function() {
		return testType("array");
	},
	object: function() {
		return testType("object");
	},
	instanceOf: function(instance) {
		return function(value) {
			return value instanceof instance;
		};
	},
	pattern: function(expected) {
		return function(value) {
			return expected.test(value);
		};
	},
	lowercase: function() {
		return function(value) {
			return typeof value === "boolean" || value === value.toLowerCase() && value.trim() !== "";
		};
	},
	uppercase: function() {
		return function(value) {
			return value === value.toUpperCase() && value.trim() !== "";
		};
	},
	vowel: function() {
		return function(value) {
			return /^[aeiou]+$/i.test(value);
		};
	},
	consonant: function() {
		return function(value) {
			return /^(?=[^aeiou])([a-z]+)$/i.test(value);
		};
	},
	first: function(expected) {
		return function(value) {
			return value[0] == expected;
		};
	},
	last: function(expected) {
		return function(value) {
			return value[value.length - 1] == expected;
		};
	},
	empty: function() {
		return function(value) {
			return value.length === 0;
		};
	},
	length: function(min, max) {
		return function(value) {
			return value.length >= min && value.length <= (max || min);
		};
	},
	minLength: function(min) {
		return function(value) {
			return value.length >= min;
		};
	},
	maxLength: function(max) {
		return function(value) {
			return value.length <= max;
		};
	},
	negative: function() {
		return function(value) {
			return value < 0;
		};
	},
	positive: function() {
		return function(value) {
			return value >= 0;
		};
	},
	between: function(a, b) {
		return function(value) {
			return value >= a && value <= b;
		};
	},
	range: function(a, b) {
		return function(value) {
			return value >= a && value <= b;
		};
	},
	lessThan: function(n) {
		return function(value) {
			return value < n;
		};
	},
	lessThanOrEqual: function(n) {
		return function(value) {
			return value <= n;
		};
	},
	greaterThan: function(n) {
		return function(value) {
			return value > n;
		};
	},
	greaterThanOrEqual: function(n) {
		return function(value) {
			return value >= n;
		};
	},
	even: function() {
		return function(value) {
			return value % 2 === 0;
		};
	},
	odd: function() {
		return function(value) {
			return value % 2 !== 0;
		};
	},
	includes: function(expected) {
		return function(value) {
			return ~value.indexOf(expected);
		};
	},
	schema: function(schema) {
		return testSchema(schema);
	},
	passesAnyOf: function() {
		var validations = [], len = arguments.length;
		while (len--) validations[len] = arguments[len];
		return function(value) {
			return validations.some(function(validation) {
				return validation.test(value);
			});
		};
	},
	optional
};
function testType(expected) {
	return function(value) {
		return Array.isArray(value) && expected === "array" || value === null && expected === "null" || typeof value === expected;
	};
}
function isIntegerPolyfill(value) {
	return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
}
function testSchema(schema) {
	return {
		simple: function(value) {
			var causes = [];
			Object.keys(schema).forEach(function(key) {
				var nestedValidation = schema[key];
				try {
					nestedValidation.check((value || {})[key]);
				} catch (ex) {
					ex.target = key;
					causes.push(ex);
				}
			});
			if (causes.length > 0) throw causes;
			return true;
		},
		async: function(value) {
			var causes = [];
			var nested = Object.keys(schema).map(function(key) {
				return schema[key].testAsync((value || {})[key]).catch(function(ex) {
					ex.target = key;
					causes.push(ex);
				});
			});
			return Promise.all(nested).then(function() {
				if (causes.length > 0) throw causes;
				return true;
			});
		}
	};
}
//#endregion
//#region node_modules/@stitches/react/dist/index.mjs
var e$3 = "colors", t$2 = "sizes", r$2 = "space", n$2 = {
	gap: r$2,
	gridGap: r$2,
	columnGap: r$2,
	gridColumnGap: r$2,
	rowGap: r$2,
	gridRowGap: r$2,
	inset: r$2,
	insetBlock: r$2,
	insetBlockEnd: r$2,
	insetBlockStart: r$2,
	insetInline: r$2,
	insetInlineEnd: r$2,
	insetInlineStart: r$2,
	margin: r$2,
	marginTop: r$2,
	marginRight: r$2,
	marginBottom: r$2,
	marginLeft: r$2,
	marginBlock: r$2,
	marginBlockEnd: r$2,
	marginBlockStart: r$2,
	marginInline: r$2,
	marginInlineEnd: r$2,
	marginInlineStart: r$2,
	padding: r$2,
	paddingTop: r$2,
	paddingRight: r$2,
	paddingBottom: r$2,
	paddingLeft: r$2,
	paddingBlock: r$2,
	paddingBlockEnd: r$2,
	paddingBlockStart: r$2,
	paddingInline: r$2,
	paddingInlineEnd: r$2,
	paddingInlineStart: r$2,
	top: r$2,
	right: r$2,
	bottom: r$2,
	left: r$2,
	scrollMargin: r$2,
	scrollMarginTop: r$2,
	scrollMarginRight: r$2,
	scrollMarginBottom: r$2,
	scrollMarginLeft: r$2,
	scrollMarginX: r$2,
	scrollMarginY: r$2,
	scrollMarginBlock: r$2,
	scrollMarginBlockEnd: r$2,
	scrollMarginBlockStart: r$2,
	scrollMarginInline: r$2,
	scrollMarginInlineEnd: r$2,
	scrollMarginInlineStart: r$2,
	scrollPadding: r$2,
	scrollPaddingTop: r$2,
	scrollPaddingRight: r$2,
	scrollPaddingBottom: r$2,
	scrollPaddingLeft: r$2,
	scrollPaddingX: r$2,
	scrollPaddingY: r$2,
	scrollPaddingBlock: r$2,
	scrollPaddingBlockEnd: r$2,
	scrollPaddingBlockStart: r$2,
	scrollPaddingInline: r$2,
	scrollPaddingInlineEnd: r$2,
	scrollPaddingInlineStart: r$2,
	fontSize: "fontSizes",
	background: e$3,
	backgroundColor: e$3,
	backgroundImage: e$3,
	borderImage: e$3,
	border: e$3,
	borderBlock: e$3,
	borderBlockEnd: e$3,
	borderBlockStart: e$3,
	borderBottom: e$3,
	borderBottomColor: e$3,
	borderColor: e$3,
	borderInline: e$3,
	borderInlineEnd: e$3,
	borderInlineStart: e$3,
	borderLeft: e$3,
	borderLeftColor: e$3,
	borderRight: e$3,
	borderRightColor: e$3,
	borderTop: e$3,
	borderTopColor: e$3,
	caretColor: e$3,
	color: e$3,
	columnRuleColor: e$3,
	fill: e$3,
	outline: e$3,
	outlineColor: e$3,
	stroke: e$3,
	textDecorationColor: e$3,
	fontFamily: "fonts",
	fontWeight: "fontWeights",
	lineHeight: "lineHeights",
	letterSpacing: "letterSpacings",
	blockSize: t$2,
	minBlockSize: t$2,
	maxBlockSize: t$2,
	inlineSize: t$2,
	minInlineSize: t$2,
	maxInlineSize: t$2,
	width: t$2,
	minWidth: t$2,
	maxWidth: t$2,
	height: t$2,
	minHeight: t$2,
	maxHeight: t$2,
	flexBasis: t$2,
	gridTemplateColumns: t$2,
	gridTemplateRows: t$2,
	borderWidth: "borderWidths",
	borderTopWidth: "borderWidths",
	borderRightWidth: "borderWidths",
	borderBottomWidth: "borderWidths",
	borderLeftWidth: "borderWidths",
	borderStyle: "borderStyles",
	borderTopStyle: "borderStyles",
	borderRightStyle: "borderStyles",
	borderBottomStyle: "borderStyles",
	borderLeftStyle: "borderStyles",
	borderRadius: "radii",
	borderTopLeftRadius: "radii",
	borderTopRightRadius: "radii",
	borderBottomRightRadius: "radii",
	borderBottomLeftRadius: "radii",
	boxShadow: "shadows",
	textShadow: "shadows",
	transition: "transitions",
	zIndex: "zIndices"
}, i$2 = (e, t) => "function" == typeof t ? { "()": Function.prototype.toString.call(t) } : t, o$2 = () => {
	const e = Object.create(null);
	return (t, r, ...n) => {
		const o = ((e) => JSON.stringify(e, i$2))(t);
		return o in e ? e[o] : e[o] = r(t, ...n);
	};
}, l$2 = Symbol.for("sxs.internal"), s$2 = (e, t) => Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)), a$2 = (e) => {
	for (const t in e) return !0;
	return !1;
}, { hasOwnProperty: c$2 } = Object.prototype, d$2 = (e) => e.includes("-") ? e : e.replace(/[A-Z]/g, ((e) => "-" + e.toLowerCase())), g$2 = /\s+(?![^()]*\))/, p$2 = (e) => (t) => e(..."string" == typeof t ? String(t).split(g$2) : [t]), u$2 = {
	appearance: (e) => ({
		WebkitAppearance: e,
		appearance: e
	}),
	backfaceVisibility: (e) => ({
		WebkitBackfaceVisibility: e,
		backfaceVisibility: e
	}),
	backdropFilter: (e) => ({
		WebkitBackdropFilter: e,
		backdropFilter: e
	}),
	backgroundClip: (e) => ({
		WebkitBackgroundClip: e,
		backgroundClip: e
	}),
	boxDecorationBreak: (e) => ({
		WebkitBoxDecorationBreak: e,
		boxDecorationBreak: e
	}),
	clipPath: (e) => ({
		WebkitClipPath: e,
		clipPath: e
	}),
	content: (e) => ({ content: e.includes("\"") || e.includes("'") || /^([A-Za-z]+\([^]*|[^]*-quote|inherit|initial|none|normal|revert|unset)$/.test(e) ? e : `"${e}"` }),
	hyphens: (e) => ({
		WebkitHyphens: e,
		hyphens: e
	}),
	maskImage: (e) => ({
		WebkitMaskImage: e,
		maskImage: e
	}),
	maskSize: (e) => ({
		WebkitMaskSize: e,
		maskSize: e
	}),
	tabSize: (e) => ({
		MozTabSize: e,
		tabSize: e
	}),
	textSizeAdjust: (e) => ({
		WebkitTextSizeAdjust: e,
		textSizeAdjust: e
	}),
	userSelect: (e) => ({
		WebkitUserSelect: e,
		userSelect: e
	}),
	marginBlock: p$2(((e, t) => ({
		marginBlockStart: e,
		marginBlockEnd: t || e
	}))),
	marginInline: p$2(((e, t) => ({
		marginInlineStart: e,
		marginInlineEnd: t || e
	}))),
	maxSize: p$2(((e, t) => ({
		maxBlockSize: e,
		maxInlineSize: t || e
	}))),
	minSize: p$2(((e, t) => ({
		minBlockSize: e,
		minInlineSize: t || e
	}))),
	paddingBlock: p$2(((e, t) => ({
		paddingBlockStart: e,
		paddingBlockEnd: t || e
	}))),
	paddingInline: p$2(((e, t) => ({
		paddingInlineStart: e,
		paddingInlineEnd: t || e
	})))
}, h$2 = /([\d.]+)([^]*)/, f$2 = (e, t) => e.length ? e.reduce(((e, r) => (e.push(...t.map(((e) => e.includes("&") ? e.replace(/&/g, /[ +>|~]/.test(r) && /&.*&/.test(e) ? `:is(${r})` : r) : r + " " + e))), e)), []) : t, m$2 = (e, t) => e in b$2 && "string" == typeof t ? t.replace(/^((?:[^]*[^\w-])?)(fit-content|stretch)((?:[^\w-][^]*)?)$/, ((t, r, n, i) => r + ("stretch" === n ? `-moz-available${i};${d$2(e)}:${r}-webkit-fill-available` : `-moz-fit-content${i};${d$2(e)}:${r}fit-content`) + i)) : String(t), b$2 = {
	blockSize: 1,
	height: 1,
	inlineSize: 1,
	maxBlockSize: 1,
	maxHeight: 1,
	maxInlineSize: 1,
	maxWidth: 1,
	minBlockSize: 1,
	minHeight: 1,
	minInlineSize: 1,
	minWidth: 1,
	width: 1
}, S$2 = (e) => e ? e + "-" : "", k$2 = (e, t, r) => e.replace(/([+-])?((?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?)?(\$|--)([$\w-]+)/g, ((e, n, i, o, l) => "$" == o == !!i ? e : (n || "--" == o ? "calc(" : "") + "var(--" + ("$" === o ? S$2(t) + (l.includes("$") ? "" : S$2(r)) + l.replace(/\$/g, "-") : l) + ")" + (n || "--" == o ? "*" + (n || "") + (i || "1") + ")" : ""))), y$2 = /\s*,\s*(?![^()]*\))/, B = Object.prototype.toString, $$2 = (e, t, r, n, i) => {
	let o, l, s;
	const a = (e, t, r) => {
		let c, g;
		const p = (e) => {
			for (c in e) {
				const R = 64 === c.charCodeAt(0);
				for (g of R && Array.isArray(e[c]) ? e[c] : [e[c]]) {
					const e = /[A-Z]/.test($ = c) ? $ : $.replace(/-[^]/g, ((e) => e[1].toUpperCase())), z = "object" == typeof g && g && g.toString === B && (!n.utils[e] || !t.length);
					if (e in n.utils && !z) {
						const t = n.utils[e];
						if (t !== l) {
							l = t, p(t(g)), l = null;
							continue;
						}
					} else if (e in u$2) {
						const t = u$2[e];
						if (t !== s) {
							s = t, p(t(g)), s = null;
							continue;
						}
					}
					if (R && (b = c.slice(1) in n.media ? "@media " + n.media[c.slice(1)] : c, c = b.replace(/\(\s*([\w-]+)\s*(=|<|<=|>|>=)\s*([\w-]+)\s*(?:(<|<=|>|>=)\s*([\w-]+)\s*)?\)/g, ((e, t, r, n, i, o) => {
						const l = h$2.test(t), s = .0625 * (l ? -1 : 1), [a, c] = l ? [n, t] : [t, n];
						return "(" + ("=" === r[0] ? "" : ">" === r[0] === l ? "max-" : "min-") + a + ":" + ("=" !== r[0] && 1 === r.length ? c.replace(h$2, ((e, t, n) => Number(t) + s * (">" === r ? 1 : -1) + n)) : c) + (i ? ") and (" + (">" === i[0] ? "min-" : "max-") + a + ":" + (1 === i.length ? o.replace(h$2, ((e, t, r) => Number(t) + s * (">" === i ? -1 : 1) + r)) : o) : "") + ")";
					}))), z) {
						const e = R ? r.concat(c) : [...r], n = R ? [...t] : f$2(t, c.split(y$2));
						void 0 !== o && i(x$1(...o)), o = void 0, a(g, n, e);
					} else void 0 === o && (o = [
						[],
						t,
						r
					]), c = R || 36 !== c.charCodeAt(0) ? c : `--${S$2(n.prefix)}${c.slice(1).replace(/\$/g, "-")}`, g = z ? g : "number" == typeof g ? g && e in I$1 ? String(g) + "px" : String(g) : k$2(m$2(e, null == g ? "" : g), n.prefix, n.themeMap[e]), o[0].push(`${R ? `${c} ` : `${d$2(c)}:`}${g}`);
				}
			}
			var b, $;
		};
		p(e), void 0 !== o && i(x$1(...o)), o = void 0;
	};
	a(e, t, r);
}, x$1 = (e, t, r) => `${r.map(((e) => `${e}{`)).join("")}${t.length ? `${t.join(",")}{` : ""}${e.join(";")}${t.length ? "}" : ""}${Array(r.length ? r.length + 1 : 0).join("}")}`, I$1 = {
	animationDelay: 1,
	animationDuration: 1,
	backgroundSize: 1,
	blockSize: 1,
	border: 1,
	borderBlock: 1,
	borderBlockEnd: 1,
	borderBlockEndWidth: 1,
	borderBlockStart: 1,
	borderBlockStartWidth: 1,
	borderBlockWidth: 1,
	borderBottom: 1,
	borderBottomLeftRadius: 1,
	borderBottomRightRadius: 1,
	borderBottomWidth: 1,
	borderEndEndRadius: 1,
	borderEndStartRadius: 1,
	borderInlineEnd: 1,
	borderInlineEndWidth: 1,
	borderInlineStart: 1,
	borderInlineStartWidth: 1,
	borderInlineWidth: 1,
	borderLeft: 1,
	borderLeftWidth: 1,
	borderRadius: 1,
	borderRight: 1,
	borderRightWidth: 1,
	borderSpacing: 1,
	borderStartEndRadius: 1,
	borderStartStartRadius: 1,
	borderTop: 1,
	borderTopLeftRadius: 1,
	borderTopRightRadius: 1,
	borderTopWidth: 1,
	borderWidth: 1,
	bottom: 1,
	columnGap: 1,
	columnRule: 1,
	columnRuleWidth: 1,
	columnWidth: 1,
	containIntrinsicSize: 1,
	flexBasis: 1,
	fontSize: 1,
	gap: 1,
	gridAutoColumns: 1,
	gridAutoRows: 1,
	gridTemplateColumns: 1,
	gridTemplateRows: 1,
	height: 1,
	inlineSize: 1,
	inset: 1,
	insetBlock: 1,
	insetBlockEnd: 1,
	insetBlockStart: 1,
	insetInline: 1,
	insetInlineEnd: 1,
	insetInlineStart: 1,
	left: 1,
	letterSpacing: 1,
	margin: 1,
	marginBlock: 1,
	marginBlockEnd: 1,
	marginBlockStart: 1,
	marginBottom: 1,
	marginInline: 1,
	marginInlineEnd: 1,
	marginInlineStart: 1,
	marginLeft: 1,
	marginRight: 1,
	marginTop: 1,
	maxBlockSize: 1,
	maxHeight: 1,
	maxInlineSize: 1,
	maxWidth: 1,
	minBlockSize: 1,
	minHeight: 1,
	minInlineSize: 1,
	minWidth: 1,
	offsetDistance: 1,
	offsetRotate: 1,
	outline: 1,
	outlineOffset: 1,
	outlineWidth: 1,
	overflowClipMargin: 1,
	padding: 1,
	paddingBlock: 1,
	paddingBlockEnd: 1,
	paddingBlockStart: 1,
	paddingBottom: 1,
	paddingInline: 1,
	paddingInlineEnd: 1,
	paddingInlineStart: 1,
	paddingLeft: 1,
	paddingRight: 1,
	paddingTop: 1,
	perspective: 1,
	right: 1,
	rowGap: 1,
	scrollMargin: 1,
	scrollMarginBlock: 1,
	scrollMarginBlockEnd: 1,
	scrollMarginBlockStart: 1,
	scrollMarginBottom: 1,
	scrollMarginInline: 1,
	scrollMarginInlineEnd: 1,
	scrollMarginInlineStart: 1,
	scrollMarginLeft: 1,
	scrollMarginRight: 1,
	scrollMarginTop: 1,
	scrollPadding: 1,
	scrollPaddingBlock: 1,
	scrollPaddingBlockEnd: 1,
	scrollPaddingBlockStart: 1,
	scrollPaddingBottom: 1,
	scrollPaddingInline: 1,
	scrollPaddingInlineEnd: 1,
	scrollPaddingInlineStart: 1,
	scrollPaddingLeft: 1,
	scrollPaddingRight: 1,
	scrollPaddingTop: 1,
	shapeMargin: 1,
	textDecoration: 1,
	textDecorationThickness: 1,
	textIndent: 1,
	textUnderlineOffset: 1,
	top: 1,
	transitionDelay: 1,
	transitionDuration: 1,
	verticalAlign: 1,
	width: 1,
	wordSpacing: 1
}, R$2 = (e) => String.fromCharCode(e + (e > 25 ? 39 : 97)), z = (e) => ((e) => {
	let t, r = "";
	for (t = Math.abs(e); t > 52; t = t / 52 | 0) r = R$2(t % 52) + r;
	return R$2(t % 52) + r;
})(((e, t) => {
	let r = t.length;
	for (; r;) e = 33 * e ^ t.charCodeAt(--r);
	return e;
})(5381, JSON.stringify(e)) >>> 0), W = [
	"themed",
	"global",
	"styled",
	"onevar",
	"resonevar",
	"allvar",
	"inline"
], j$1 = (e) => {
	if (e.href && !e.href.startsWith(location.origin)) return !1;
	try {
		return !!e.cssRules;
	} catch (e) {
		return !1;
	}
}, E$1 = (e) => {
	let t;
	const r = () => {
		const { cssRules: e } = t.sheet;
		return [].map.call(e, ((r, n) => {
			const { cssText: i } = r;
			let o = "";
			if (i.startsWith("--sxs")) return "";
			if (e[n - 1] && (o = e[n - 1].cssText).startsWith("--sxs")) {
				if (!r.cssRules.length) return "";
				for (const e in t.rules) if (t.rules[e].group === r) return `--sxs{--sxs:${[...t.rules[e].cache].join(" ")}}${i}`;
				return r.cssRules.length ? `${o}${i}` : "";
			}
			return i;
		})).join("");
	}, n = () => {
		if (t) {
			const { rules: e, sheet: r } = t;
			if (!r.deleteRule) {
				for (; 3 === Object(Object(r.cssRules)[0]).type;) r.cssRules.splice(0, 1);
				r.cssRules = [];
			}
			for (const t in e) delete e[t];
		}
		const i = Object(e).styleSheets || [];
		for (const e of i) if (j$1(e)) {
			for (let i = 0, o = e.cssRules; o[i]; ++i) {
				const l = Object(o[i]);
				if (1 !== l.type) continue;
				const s = Object(o[i + 1]);
				if (4 !== s.type) continue;
				++i;
				const { cssText: a } = l;
				if (!a.startsWith("--sxs")) continue;
				const c = a.slice(14, -3).trim().split(/\s+/), d = W[c[0]];
				d && (t || (t = {
					sheet: e,
					reset: n,
					rules: {},
					toString: r
				}), t.rules[d] = {
					group: s,
					index: i,
					cache: new Set(c)
				});
			}
			if (t) break;
		}
		if (!t) {
			const i = (e, t) => ({
				type: t,
				cssRules: [],
				insertRule(e, t) {
					this.cssRules.splice(t, 0, i(e, {
						import: 3,
						undefined: 1
					}[(e.toLowerCase().match(/^@([a-z]+)/) || [])[1]] || 4));
				},
				get cssText() {
					return "@media{}" === e ? `@media{${[].map.call(this.cssRules, ((e) => e.cssText)).join("")}}` : e;
				}
			});
			t = {
				sheet: e ? (e.head || e).appendChild(document.createElement("style")).sheet : i("", "text/css"),
				rules: {},
				reset: n,
				toString: r
			};
		}
		const { sheet: o, rules: l } = t;
		for (let e = W.length - 1; e >= 0; --e) {
			const t = W[e];
			if (!l[t]) {
				const r = W[e + 1], n = l[r] ? l[r].index : o.cssRules.length;
				o.insertRule("@media{}", n), o.insertRule(`--sxs{--sxs:${e}}`, n), l[t] = {
					group: o.cssRules[n + 1],
					index: n,
					cache: /* @__PURE__ */ new Set([e])
				};
			}
			v$2(l[t]);
		}
	};
	return n(), t;
}, v$2 = (e) => {
	const t = e.group;
	let r = t.cssRules.length;
	e.apply = (e) => {
		try {
			t.insertRule(e, r), ++r;
		} catch (e) {}
	};
}, T$1 = Symbol(), w$1 = o$2(), M$1 = (e, t) => w$1(e, (() => (...r) => {
	let n = {
		type: null,
		composers: /* @__PURE__ */ new Set()
	};
	for (const t of r) if (null != t) if (t[l$2]) {
		n.type ??= t[l$2].type;
		for (const e of t[l$2].composers) n.composers.add(e);
	} else t.constructor !== Object || t.$$typeof ? n.type ??= t : n.composers.add(C$1(t, e));
	return n.type ??= "span", n.composers.size || n.composers.add([
		"PJLV",
		{},
		[],
		[],
		{},
		[]
	]), P(e, n, t);
})), C$1 = ({ variants: e, compoundVariants: t, defaultVariants: r, ...n }, i) => {
	const o = `${S$2(i.prefix)}c-${z(n)}`, l = [], s = [], d = Object.create(null), g = [];
	for (const e in r) d[e] = String(r[e]);
	if ("object" == typeof e && e) for (const t in e) {
		p = d, u = t, c$2.call(p, u) || (d[t] = "undefined");
		const r = e[t];
		for (const e in r) {
			const n = { [t]: String(e) };
			"undefined" === String(e) && g.push(t);
			const i = r[e], o = [
				n,
				i,
				!a$2(i)
			];
			l.push(o);
		}
	}
	var p, u;
	if ("object" == typeof t && t) for (const e of t) {
		let { css: t, ...r } = e;
		t = "object" == typeof t && t || {};
		for (const e in r) r[e] = String(r[e]);
		const n = [
			r,
			t,
			!a$2(t)
		];
		s.push(n);
	}
	return [
		o,
		n,
		l,
		s,
		d,
		g
	];
}, P = (e, t, r) => {
	const [n, i, o, a] = L$1(t.composers), c = "function" == typeof t.type || t.type.$$typeof ? ((e) => {
		function t() {
			for (let r = 0; r < t[T$1].length; r++) {
				const [n, i] = t[T$1][r];
				e.rules[n].apply(i);
			}
			return t[T$1] = [], null;
		}
		return t[T$1] = [], t.rules = {}, W.forEach(((e) => t.rules[e] = { apply: (r) => t[T$1].push([e, r]) })), t;
	})(r) : null, d = (c || r).rules, g = `.${n}${i.length > 1 ? `:where(.${i.slice(1).join(".")})` : ""}`, p = (l) => {
		l = "object" == typeof l && l || A$1;
		const { css: s, ...p } = l, u = {};
		for (const e in o) if (delete p[e], e in l) {
			let t = l[e];
			"object" == typeof t && t ? u[e] = {
				"@initial": o[e],
				...t
			} : (t = String(t), u[e] = "undefined" !== t || a.has(e) ? t : o[e]);
		} else u[e] = o[e];
		const h = /* @__PURE__ */ new Set([...i]);
		for (const [n, i, o, l] of t.composers) {
			r.rules.styled.cache.has(n) || (r.rules.styled.cache.add(n), $$2(i, [`.${n}`], [], e, ((e) => {
				d.styled.apply(e);
			})));
			const t = O(o, u, e.media), s = O(l, u, e.media, !0);
			for (const i of t) if (void 0 !== i) for (const [t, o, l] of i) {
				const i = `${n}-${z(o)}-${t}`;
				h.add(i);
				const s = (l ? r.rules.resonevar : r.rules.onevar).cache, a = l ? d.resonevar : d.onevar;
				s.has(i) || (s.add(i), $$2(o, [`.${i}`], [], e, ((e) => {
					a.apply(e);
				})));
			}
			for (const t of s) if (void 0 !== t) for (const [i, o] of t) {
				const t = `${n}-${z(o)}-${i}`;
				h.add(t), r.rules.allvar.cache.has(t) || (r.rules.allvar.cache.add(t), $$2(o, [`.${t}`], [], e, ((e) => {
					d.allvar.apply(e);
				})));
			}
		}
		if ("object" == typeof s && s) {
			const t = `${n}-i${z(s)}-css`;
			h.add(t), r.rules.inline.cache.has(t) || (r.rules.inline.cache.add(t), $$2(s, [`.${t}`], [], e, ((e) => {
				d.inline.apply(e);
			})));
		}
		for (const e of String(l.className || "").trim().split(/\s+/)) e && h.add(e);
		const f = p.className = [...h].join(" ");
		return {
			type: t.type,
			className: f,
			selector: g,
			props: p,
			toString: () => f,
			deferredInjector: c
		};
	};
	return s$2(p, {
		className: n,
		selector: g,
		[l$2]: t,
		toString: () => (r.rules.styled.cache.has(n) || p(), n)
	});
}, L$1 = (e) => {
	let t = "";
	const r = [], n = {}, i = [];
	for (const [o, , , , l, s] of e) {
		"" === t && (t = o), r.push(o), i.push(...s);
		for (const e in l) {
			const t = l[e];
			(void 0 === n[e] || "undefined" !== t || s.includes(t)) && (n[e] = t);
		}
	}
	return [
		t,
		r,
		n,
		new Set(i)
	];
}, O = (e, t, r, n) => {
	const i = [];
	e: for (let [o, l, s] of e) {
		if (s) continue;
		let e, a = 0, c = !1;
		for (e in o) {
			const n = o[e];
			let i = t[e];
			if (i !== n) {
				if ("object" != typeof i || !i) continue e;
				{
					let e, t, o = 0;
					for (const l in i) {
						if (n === String(i[l])) {
							if ("@initial" !== l) {
								const e = l.slice(1);
								(t = t || []).push(e in r ? r[e] : l.replace(/^@media ?/, "")), c = !0;
							}
							a += o, e = !0;
						}
						++o;
					}
					if (t && t.length && (l = { ["@media " + t.join(", ")]: l }), !e) continue e;
				}
			}
		}
		(i[a] = i[a] || []).push([
			n ? "cv" : `${e}-${o[e]}`,
			l,
			c
		]);
	}
	return i;
}, A$1 = {}, N$1 = o$2(), D$1 = (e, t) => N$1(e, (() => (...r) => {
	const n = () => {
		for (let n of r) {
			n = "object" == typeof n && n || {};
			let r = z(n);
			if (!t.rules.global.cache.has(r)) {
				if (t.rules.global.cache.add(r), "@import" in n) {
					let e = [].indexOf.call(t.sheet.cssRules, t.rules.themed.group) - 1;
					for (let r of [].concat(n["@import"])) r = r.includes("\"") || r.includes("'") ? r : `"${r}"`, t.sheet.insertRule(`@import ${r};`, e++);
					delete n["@import"];
				}
				$$2(n, [], [], e, ((e) => {
					t.rules.global.apply(e);
				}));
			}
		}
		return "";
	};
	return s$2(n, { toString: n });
})), H$1 = o$2(), V$2 = (e, t) => H$1(e, (() => (r) => {
	const n = `${S$2(e.prefix)}k-${z(r)}`, i = () => {
		if (!t.rules.global.cache.has(n)) {
			t.rules.global.cache.add(n);
			const i = [];
			$$2(r, [], [], e, ((e) => i.push(e)));
			const o = `@keyframes ${n}{${i.join("")}}`;
			t.rules.global.apply(o);
		}
		return n;
	};
	return s$2(i, {
		get name() {
			return i();
		},
		toString: i
	});
})), G$1 = class {
	constructor(e, t, r, n) {
		this.token = null == e ? "" : String(e), this.value = null == t ? "" : String(t), this.scale = null == r ? "" : String(r), this.prefix = null == n ? "" : String(n);
	}
	get computedValue() {
		return "var(" + this.variable + ")";
	}
	get variable() {
		return "--" + S$2(this.prefix) + S$2(this.scale) + this.token;
	}
	toString() {
		return this.computedValue;
	}
}, F = o$2(), J$1 = (e, t) => F(e, (() => (r, n) => {
	n = "object" == typeof r && r || Object(n);
	const i = `.${r = (r = "string" == typeof r ? r : "") || `${S$2(e.prefix)}t-${z(n)}`}`, o = {}, l = [];
	for (const t in n) {
		o[t] = {};
		for (const r in n[t]) {
			const i = `--${S$2(e.prefix)}${t}-${r}`, s = k$2(String(n[t][r]), e.prefix, t);
			o[t][r] = new G$1(r, s, t, e.prefix), l.push(`${i}:${s}`);
		}
	}
	const s = () => {
		if (l.length && !t.rules.themed.cache.has(r)) {
			t.rules.themed.cache.add(r);
			const i = `${n === e.theme ? ":root," : ""}.${r}{${l.join(";")}}`;
			t.rules.themed.apply(i);
		}
		return r;
	};
	return {
		...o,
		get className() {
			return s();
		},
		selector: i,
		toString: s
	};
})), U$1 = o$2();
var Y$1 = o$2();
var q$2 = (e) => {
	const t = ((e) => {
		let t = !1;
		const r = U$1(e, ((e) => {
			t = !0;
			const r = "prefix" in (e = "object" == typeof e && e || {}) ? String(e.prefix) : "", i = "object" == typeof e.media && e.media || {}, o = "object" == typeof e.root ? e.root || null : globalThis.document || null, l = "object" == typeof e.theme && e.theme || {}, s = {
				prefix: r,
				media: i,
				theme: l,
				themeMap: "object" == typeof e.themeMap && e.themeMap || { ...n$2 },
				utils: "object" == typeof e.utils && e.utils || {}
			}, a = E$1(o), c = {
				css: M$1(s, a),
				globalCss: D$1(s, a),
				keyframes: V$2(s, a),
				createTheme: J$1(s, a),
				reset() {
					a.reset(), c.theme.toString();
				},
				theme: {},
				sheet: a,
				config: s,
				prefix: r,
				getCssText: a.toString,
				toString: a.toString
			};
			return String(c.theme = c.createTheme(l)), c;
		}));
		return t || r.reset(), r;
	})(e);
	return t.styled = (({ config: e, sheet: t }) => Y$1(e, (() => {
		const r = M$1(e, t);
		return (...e) => {
			const t = r(...e), n = t[l$2].type, i = import_react.forwardRef(((e, r) => {
				const i = e && e.as || n, { props: o, deferredInjector: l } = t(e);
				return delete o.as, o.ref = r, l ? import_react.createElement(import_react.Fragment, null, import_react.createElement(i, o), import_react.createElement(l, null)) : import_react.createElement(i, o);
			}));
			return i.className = t.className, i.displayName = `Styled.${n.displayName || n.name || n}`, i.selector = t.selector, i.toString = () => t.selector, i[l$2] = t[l$2], i;
		};
	})))(t), t;
};
//#endregion
//#region node_modules/@use-gesture/core/dist/maths-0ab39ae9.esm.js
function clamp$1(v, min, max) {
	return Math.max(min, Math.min(v, max));
}
var V$1 = {
	toVector(v, fallback) {
		if (v === void 0) v = fallback;
		return Array.isArray(v) ? v : [v, v];
	},
	add(v1, v2) {
		return [v1[0] + v2[0], v1[1] + v2[1]];
	},
	sub(v1, v2) {
		return [v1[0] - v2[0], v1[1] - v2[1]];
	},
	addTo(v1, v2) {
		v1[0] += v2[0];
		v1[1] += v2[1];
	},
	subTo(v1, v2) {
		v1[0] -= v2[0];
		v1[1] -= v2[1];
	}
};
function rubberband(distance, dimension, constant) {
	if (dimension === 0 || Math.abs(dimension) === Infinity) return Math.pow(distance, constant * 5);
	return distance * dimension * constant / (dimension + constant * distance);
}
function rubberbandIfOutOfBounds(position, min, max, constant = .15) {
	if (constant === 0) return clamp$1(position, min, max);
	if (position < min) return -rubberband(min - position, max - min, constant) + min;
	if (position > max) return +rubberband(position - max, max - min, constant) + max;
	return position;
}
function computeRubberband(bounds, [Vx, Vy], [Rx, Ry]) {
	const [[X0, X1], [Y0, Y1]] = bounds;
	return [rubberbandIfOutOfBounds(Vx, X0, X1, Rx), rubberbandIfOutOfBounds(Vy, Y0, Y1, Ry)];
}
//#endregion
//#region node_modules/@use-gesture/core/dist/actions-fe213e88.esm.js
function _toPrimitive$1(input, hint) {
	if (typeof input !== "object" || input === null) return input;
	var prim = input[Symbol.toPrimitive];
	if (prim !== void 0) {
		var res = prim.call(input, hint || "default");
		if (typeof res !== "object") return res;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey$1(arg) {
	var key = _toPrimitive$1(arg, "string");
	return typeof key === "symbol" ? key : String(key);
}
function _defineProperty$3(obj, key, value) {
	key = _toPropertyKey$1(key);
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function ownKeys$3(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2$1(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$3(Object(t), !0).forEach(function(r) {
			_defineProperty$3(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var EVENT_TYPE_MAP = {
	pointer: {
		start: "down",
		change: "move",
		end: "up"
	},
	mouse: {
		start: "down",
		change: "move",
		end: "up"
	},
	touch: {
		start: "start",
		change: "move",
		end: "end"
	},
	gesture: {
		start: "start",
		change: "change",
		end: "end"
	}
};
function capitalize(string) {
	if (!string) return "";
	return string[0].toUpperCase() + string.slice(1);
}
var actionsWithoutCaptureSupported = ["enter", "leave"];
function hasCapture(capture = false, actionKey) {
	return capture && !actionsWithoutCaptureSupported.includes(actionKey);
}
function toHandlerProp(device, action = "", capture = false) {
	const deviceProps = EVENT_TYPE_MAP[device];
	const actionKey = deviceProps ? deviceProps[action] || action : action;
	return "on" + capitalize(device) + capitalize(actionKey) + (hasCapture(capture, actionKey) ? "Capture" : "");
}
var pointerCaptureEvents = ["gotpointercapture", "lostpointercapture"];
function parseProp(prop) {
	let eventKey = prop.substring(2).toLowerCase();
	const passive = !!~eventKey.indexOf("passive");
	if (passive) eventKey = eventKey.replace("passive", "");
	const captureKey = pointerCaptureEvents.includes(eventKey) ? "capturecapture" : "capture";
	const capture = !!~eventKey.indexOf(captureKey);
	if (capture) eventKey = eventKey.replace("capture", "");
	return {
		device: eventKey,
		capture,
		passive
	};
}
function toDomEventType(device, action = "") {
	const deviceProps = EVENT_TYPE_MAP[device];
	return device + (deviceProps ? deviceProps[action] || action : action);
}
function isTouch(event) {
	return "touches" in event;
}
function getPointerType(event) {
	if (isTouch(event)) return "touch";
	if ("pointerType" in event) return event.pointerType;
	return "mouse";
}
function getCurrentTargetTouchList(event) {
	return Array.from(event.touches).filter((e) => {
		var _event$currentTarget, _event$currentTarget$;
		return e.target === event.currentTarget || ((_event$currentTarget = event.currentTarget) === null || _event$currentTarget === void 0 || (_event$currentTarget$ = _event$currentTarget.contains) === null || _event$currentTarget$ === void 0 ? void 0 : _event$currentTarget$.call(_event$currentTarget, e.target));
	});
}
function getTouchList(event) {
	return event.type === "touchend" || event.type === "touchcancel" ? event.changedTouches : event.targetTouches;
}
function getValueEvent(event) {
	return isTouch(event) ? getTouchList(event)[0] : event;
}
function touchIds(event) {
	return getCurrentTargetTouchList(event).map((touch) => touch.identifier);
}
function pointerId(event) {
	const valueEvent = getValueEvent(event);
	return isTouch(event) ? valueEvent.identifier : valueEvent.pointerId;
}
function pointerValues(event) {
	const valueEvent = getValueEvent(event);
	return [valueEvent.clientX, valueEvent.clientY];
}
function getEventDetails(event) {
	const payload = {};
	if ("buttons" in event) payload.buttons = event.buttons;
	if ("shiftKey" in event) {
		const { shiftKey, altKey, metaKey, ctrlKey } = event;
		Object.assign(payload, {
			shiftKey,
			altKey,
			metaKey,
			ctrlKey
		});
	}
	return payload;
}
function call(v, ...args) {
	if (typeof v === "function") return v(...args);
	else return v;
}
function noop$1() {}
function chain(...fns) {
	if (fns.length === 0) return noop$1;
	if (fns.length === 1) return fns[0];
	return function() {
		let result;
		for (const fn of fns) result = fn.apply(this, arguments) || result;
		return result;
	};
}
function assignDefault(value, fallback) {
	return Object.assign({}, fallback, value || {});
}
var BEFORE_LAST_KINEMATICS_DELAY = 32;
var Engine = class {
	constructor(ctrl, args, key) {
		this.ctrl = ctrl;
		this.args = args;
		this.key = key;
		if (!this.state) {
			this.state = {};
			this.computeValues([0, 0]);
			this.computeInitial();
			if (this.init) this.init();
			this.reset();
		}
	}
	get state() {
		return this.ctrl.state[this.key];
	}
	set state(state) {
		this.ctrl.state[this.key] = state;
	}
	get shared() {
		return this.ctrl.state.shared;
	}
	get eventStore() {
		return this.ctrl.gestureEventStores[this.key];
	}
	get timeoutStore() {
		return this.ctrl.gestureTimeoutStores[this.key];
	}
	get config() {
		return this.ctrl.config[this.key];
	}
	get sharedConfig() {
		return this.ctrl.config.shared;
	}
	get handler() {
		return this.ctrl.handlers[this.key];
	}
	reset() {
		const { state, shared, ingKey, args } = this;
		shared[ingKey] = state._active = state.active = state._blocked = state._force = false;
		state._step = [false, false];
		state.intentional = false;
		state._movement = [0, 0];
		state._distance = [0, 0];
		state._direction = [0, 0];
		state._delta = [0, 0];
		state._bounds = [[-Infinity, Infinity], [-Infinity, Infinity]];
		state.args = args;
		state.axis = void 0;
		state.memo = void 0;
		state.elapsedTime = state.timeDelta = 0;
		state.direction = [0, 0];
		state.distance = [0, 0];
		state.overflow = [0, 0];
		state._movementBound = [false, false];
		state.velocity = [0, 0];
		state.movement = [0, 0];
		state.delta = [0, 0];
		state.timeStamp = 0;
	}
	start(event) {
		const state = this.state;
		const config = this.config;
		if (!state._active) {
			this.reset();
			this.computeInitial();
			state._active = true;
			state.target = event.target;
			state.currentTarget = event.currentTarget;
			state.lastOffset = config.from ? call(config.from, state) : state.offset;
			state.offset = state.lastOffset;
			state.startTime = state.timeStamp = event.timeStamp;
		}
	}
	computeValues(values) {
		const state = this.state;
		state._values = values;
		state.values = this.config.transform(values);
	}
	computeInitial() {
		const state = this.state;
		state._initial = state._values;
		state.initial = state.values;
	}
	compute(event) {
		const { state, config, shared } = this;
		state.args = this.args;
		let dt = 0;
		if (event) {
			state.event = event;
			if (config.preventDefault && event.cancelable) state.event.preventDefault();
			state.type = event.type;
			shared.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size;
			shared.locked = !!document.pointerLockElement;
			Object.assign(shared, getEventDetails(event));
			shared.down = shared.pressed = shared.buttons % 2 === 1 || shared.touches > 0;
			dt = event.timeStamp - state.timeStamp;
			state.timeStamp = event.timeStamp;
			state.elapsedTime = state.timeStamp - state.startTime;
		}
		if (state._active) {
			const _absoluteDelta = state._delta.map(Math.abs);
			V$1.addTo(state._distance, _absoluteDelta);
		}
		if (this.axisIntent) this.axisIntent(event);
		const [_m0, _m1] = state._movement;
		const [t0, t1] = config.threshold;
		const { _step, values } = state;
		if (config.hasCustomTransform) {
			if (_step[0] === false) _step[0] = Math.abs(_m0) >= t0 && values[0];
			if (_step[1] === false) _step[1] = Math.abs(_m1) >= t1 && values[1];
		} else {
			if (_step[0] === false) _step[0] = Math.abs(_m0) >= t0 && Math.sign(_m0) * t0;
			if (_step[1] === false) _step[1] = Math.abs(_m1) >= t1 && Math.sign(_m1) * t1;
		}
		state.intentional = _step[0] !== false || _step[1] !== false;
		if (!state.intentional) return;
		const movement = [0, 0];
		if (config.hasCustomTransform) {
			const [v0, v1] = values;
			movement[0] = _step[0] !== false ? v0 - _step[0] : 0;
			movement[1] = _step[1] !== false ? v1 - _step[1] : 0;
		} else {
			movement[0] = _step[0] !== false ? _m0 - _step[0] : 0;
			movement[1] = _step[1] !== false ? _m1 - _step[1] : 0;
		}
		if (this.restrictToAxis && !state._blocked) this.restrictToAxis(movement);
		const previousOffset = state.offset;
		const gestureIsActive = state._active && !state._blocked || state.active;
		if (gestureIsActive) {
			state.first = state._active && !state.active;
			state.last = !state._active && state.active;
			state.active = shared[this.ingKey] = state._active;
			if (event) {
				if (state.first) {
					if ("bounds" in config) state._bounds = call(config.bounds, state);
					if (this.setup) this.setup();
				}
				state.movement = movement;
				this.computeOffset();
			}
		}
		const [ox, oy] = state.offset;
		const [[x0, x1], [y0, y1]] = state._bounds;
		state.overflow = [ox < x0 ? -1 : ox > x1 ? 1 : 0, oy < y0 ? -1 : oy > y1 ? 1 : 0];
		state._movementBound[0] = state.overflow[0] ? state._movementBound[0] === false ? state._movement[0] : state._movementBound[0] : false;
		state._movementBound[1] = state.overflow[1] ? state._movementBound[1] === false ? state._movement[1] : state._movementBound[1] : false;
		const rubberband = state._active ? config.rubberband || [0, 0] : [0, 0];
		state.offset = computeRubberband(state._bounds, state.offset, rubberband);
		state.delta = V$1.sub(state.offset, previousOffset);
		this.computeMovement();
		if (gestureIsActive && (!state.last || dt > BEFORE_LAST_KINEMATICS_DELAY)) {
			state.delta = V$1.sub(state.offset, previousOffset);
			const absoluteDelta = state.delta.map(Math.abs);
			V$1.addTo(state.distance, absoluteDelta);
			state.direction = state.delta.map(Math.sign);
			state._direction = state._delta.map(Math.sign);
			if (!state.first && dt > 0) {
				state.velocity = [absoluteDelta[0] / dt, absoluteDelta[1] / dt];
				state.timeDelta = dt;
			}
		}
	}
	emit() {
		const state = this.state;
		const shared = this.shared;
		const config = this.config;
		if (!state._active) this.clean();
		if ((state._blocked || !state.intentional) && !state._force && !config.triggerAllEvents) return;
		const memo = this.handler(_objectSpread2$1(_objectSpread2$1(_objectSpread2$1({}, shared), state), {}, { [this.aliasKey]: state.values }));
		if (memo !== void 0) state.memo = memo;
	}
	clean() {
		this.eventStore.clean();
		this.timeoutStore.clean();
	}
};
function selectAxis([dx, dy], threshold) {
	const absDx = Math.abs(dx);
	const absDy = Math.abs(dy);
	if (absDx > absDy && absDx > threshold) return "x";
	if (absDy > absDx && absDy > threshold) return "y";
}
var CoordinatesEngine = class extends Engine {
	constructor(...args) {
		super(...args);
		_defineProperty$3(this, "aliasKey", "xy");
	}
	reset() {
		super.reset();
		this.state.axis = void 0;
	}
	init() {
		this.state.offset = [0, 0];
		this.state.lastOffset = [0, 0];
	}
	computeOffset() {
		this.state.offset = V$1.add(this.state.lastOffset, this.state.movement);
	}
	computeMovement() {
		this.state.movement = V$1.sub(this.state.offset, this.state.lastOffset);
	}
	axisIntent(event) {
		const state = this.state;
		const config = this.config;
		if (!state.axis && event) {
			const threshold = typeof config.axisThreshold === "object" ? config.axisThreshold[getPointerType(event)] : config.axisThreshold;
			state.axis = selectAxis(state._movement, threshold);
		}
		state._blocked = (config.lockDirection || !!config.axis) && !state.axis || !!config.axis && config.axis !== state.axis;
	}
	restrictToAxis(v) {
		if (this.config.axis || this.config.lockDirection) switch (this.state.axis) {
			case "x":
				v[1] = 0;
				break;
			case "y": v[0] = 0;
		}
	}
};
var identity = (v) => v;
var DEFAULT_RUBBERBAND = .15;
var commonConfigResolver = {
	enabled(value = true) {
		return value;
	},
	eventOptions(value, _k, config) {
		return _objectSpread2$1(_objectSpread2$1({}, config.shared.eventOptions), value);
	},
	preventDefault(value = false) {
		return value;
	},
	triggerAllEvents(value = false) {
		return value;
	},
	rubberband(value = 0) {
		switch (value) {
			case true: return [DEFAULT_RUBBERBAND, DEFAULT_RUBBERBAND];
			case false: return [0, 0];
			default: return V$1.toVector(value);
		}
	},
	from(value) {
		if (typeof value === "function") return value;
		if (value != null) return V$1.toVector(value);
	},
	transform(value, _k, config) {
		const transform = value || config.shared.transform;
		this.hasCustomTransform = !!transform;
		return transform || identity;
	},
	threshold(value) {
		return V$1.toVector(value, 0);
	}
};
var DEFAULT_AXIS_THRESHOLD = 0;
var coordinatesConfigResolver = _objectSpread2$1(_objectSpread2$1({}, commonConfigResolver), {}, {
	axis(_v, _k, { axis }) {
		this.lockDirection = axis === "lock";
		if (!this.lockDirection) return axis;
	},
	axisThreshold(value = DEFAULT_AXIS_THRESHOLD) {
		return value;
	},
	bounds(value = {}) {
		if (typeof value === "function") return (state) => coordinatesConfigResolver.bounds(value(state));
		if ("current" in value) return () => value.current;
		if (typeof HTMLElement === "function" && value instanceof HTMLElement) return value;
		const { left = -Infinity, right = Infinity, top = -Infinity, bottom = Infinity } = value;
		return [[left, right], [top, bottom]];
	}
});
var KEYS_DELTA_MAP = {
	ArrowRight: (displacement, factor = 1) => [displacement * factor, 0],
	ArrowLeft: (displacement, factor = 1) => [-1 * displacement * factor, 0],
	ArrowUp: (displacement, factor = 1) => [0, -1 * displacement * factor],
	ArrowDown: (displacement, factor = 1) => [0, displacement * factor]
};
var DragEngine = class extends CoordinatesEngine {
	constructor(...args) {
		super(...args);
		_defineProperty$3(this, "ingKey", "dragging");
	}
	reset() {
		super.reset();
		const state = this.state;
		state._pointerId = void 0;
		state._pointerActive = false;
		state._keyboardActive = false;
		state._preventScroll = false;
		state._delayed = false;
		state.swipe = [0, 0];
		state.tap = false;
		state.canceled = false;
		state.cancel = this.cancel.bind(this);
	}
	setup() {
		const state = this.state;
		if (state._bounds instanceof HTMLElement) {
			const boundRect = state._bounds.getBoundingClientRect();
			const targetRect = state.currentTarget.getBoundingClientRect();
			const _bounds = {
				left: boundRect.left - targetRect.left + state.offset[0],
				right: boundRect.right - targetRect.right + state.offset[0],
				top: boundRect.top - targetRect.top + state.offset[1],
				bottom: boundRect.bottom - targetRect.bottom + state.offset[1]
			};
			state._bounds = coordinatesConfigResolver.bounds(_bounds);
		}
	}
	cancel() {
		const state = this.state;
		if (state.canceled) return;
		state.canceled = true;
		state._active = false;
		setTimeout(() => {
			this.compute();
			this.emit();
		}, 0);
	}
	setActive() {
		this.state._active = this.state._pointerActive || this.state._keyboardActive;
	}
	clean() {
		this.pointerClean();
		this.state._pointerActive = false;
		this.state._keyboardActive = false;
		super.clean();
	}
	pointerDown(event) {
		const config = this.config;
		const state = this.state;
		if (event.buttons != null && (Array.isArray(config.pointerButtons) ? !config.pointerButtons.includes(event.buttons) : config.pointerButtons !== -1 && config.pointerButtons !== event.buttons)) return;
		const ctrlIds = this.ctrl.setEventIds(event);
		if (config.pointerCapture) event.target.setPointerCapture(event.pointerId);
		if (ctrlIds && ctrlIds.size > 1 && state._pointerActive) return;
		this.start(event);
		this.setupPointer(event);
		state._pointerId = pointerId(event);
		state._pointerActive = true;
		this.computeValues(pointerValues(event));
		this.computeInitial();
		if (config.preventScrollAxis && getPointerType(event) !== "mouse") {
			state._active = false;
			this.setupScrollPrevention(event);
		} else if (config.delay > 0) {
			this.setupDelayTrigger(event);
			if (config.triggerAllEvents) {
				this.compute(event);
				this.emit();
			}
		} else this.startPointerDrag(event);
	}
	startPointerDrag(event) {
		const state = this.state;
		state._active = true;
		state._preventScroll = true;
		state._delayed = false;
		this.compute(event);
		this.emit();
	}
	pointerMove(event) {
		const state = this.state;
		const config = this.config;
		if (!state._pointerActive) return;
		const id = pointerId(event);
		if (state._pointerId !== void 0 && id !== state._pointerId) return;
		const _values = pointerValues(event);
		if (document.pointerLockElement === event.target) state._delta = [event.movementX, event.movementY];
		else {
			state._delta = V$1.sub(_values, state._values);
			this.computeValues(_values);
		}
		V$1.addTo(state._movement, state._delta);
		this.compute(event);
		if (state._delayed && state.intentional) {
			this.timeoutStore.remove("dragDelay");
			state.active = false;
			this.startPointerDrag(event);
			return;
		}
		if (config.preventScrollAxis && !state._preventScroll) {
			if (state.axis) {
				if (state.axis === config.preventScrollAxis || config.preventScrollAxis === "xy") {
					state._active = false;
					this.clean();
					return;
				} else {
					this.timeoutStore.remove("startPointerDrag");
					this.startPointerDrag(event);
					return;
				}
			} else return;
		}
		this.emit();
	}
	pointerUp(event) {
		this.ctrl.setEventIds(event);
		try {
			if (this.config.pointerCapture && event.target.hasPointerCapture(event.pointerId)) event.target.releasePointerCapture(event.pointerId);
		} catch (_unused) {}
		const state = this.state;
		const config = this.config;
		if (!state._active || !state._pointerActive) return;
		const id = pointerId(event);
		if (state._pointerId !== void 0 && id !== state._pointerId) return;
		this.state._pointerActive = false;
		this.setActive();
		this.compute(event);
		const [dx, dy] = state._distance;
		state.tap = dx <= config.tapsThreshold && dy <= config.tapsThreshold;
		if (state.tap && config.filterTaps) state._force = true;
		else {
			const [_dx, _dy] = state._delta;
			const [_mx, _my] = state._movement;
			const [svx, svy] = config.swipe.velocity;
			const [sx, sy] = config.swipe.distance;
			const sdt = config.swipe.duration;
			if (state.elapsedTime < sdt) {
				const _vx = Math.abs(_dx / state.timeDelta);
				const _vy = Math.abs(_dy / state.timeDelta);
				if (_vx > svx && Math.abs(_mx) > sx) state.swipe[0] = Math.sign(_dx);
				if (_vy > svy && Math.abs(_my) > sy) state.swipe[1] = Math.sign(_dy);
			}
		}
		this.emit();
	}
	pointerClick(event) {
		if (!this.state.tap && event.detail > 0) {
			event.preventDefault();
			event.stopPropagation();
		}
	}
	setupPointer(event) {
		const config = this.config;
		const device = config.device;
		if (config.pointerLock) event.currentTarget.requestPointerLock();
		if (!config.pointerCapture) {
			this.eventStore.add(this.sharedConfig.window, device, "change", this.pointerMove.bind(this));
			this.eventStore.add(this.sharedConfig.window, device, "end", this.pointerUp.bind(this));
			this.eventStore.add(this.sharedConfig.window, device, "cancel", this.pointerUp.bind(this));
		}
	}
	pointerClean() {
		if (this.config.pointerLock && document.pointerLockElement === this.state.currentTarget) document.exitPointerLock();
	}
	preventScroll(event) {
		if (this.state._preventScroll && event.cancelable) event.preventDefault();
	}
	setupScrollPrevention(event) {
		this.state._preventScroll = false;
		persistEvent(event);
		const remove = this.eventStore.add(this.sharedConfig.window, "touch", "change", this.preventScroll.bind(this), { passive: false });
		this.eventStore.add(this.sharedConfig.window, "touch", "end", remove);
		this.eventStore.add(this.sharedConfig.window, "touch", "cancel", remove);
		this.timeoutStore.add("startPointerDrag", this.startPointerDrag.bind(this), this.config.preventScrollDelay, event);
	}
	setupDelayTrigger(event) {
		this.state._delayed = true;
		this.timeoutStore.add("dragDelay", () => {
			this.state._step = [0, 0];
			this.startPointerDrag(event);
		}, this.config.delay);
	}
	keyDown(event) {
		const deltaFn = KEYS_DELTA_MAP[event.key];
		if (deltaFn) {
			const state = this.state;
			const factor = event.shiftKey ? 10 : event.altKey ? .1 : 1;
			this.start(event);
			state._delta = deltaFn(this.config.keyboardDisplacement, factor);
			state._keyboardActive = true;
			V$1.addTo(state._movement, state._delta);
			this.compute(event);
			this.emit();
		}
	}
	keyUp(event) {
		if (!(event.key in KEYS_DELTA_MAP)) return;
		this.state._keyboardActive = false;
		this.setActive();
		this.compute(event);
		this.emit();
	}
	bind(bindFunction) {
		const device = this.config.device;
		bindFunction(device, "start", this.pointerDown.bind(this));
		if (this.config.pointerCapture) {
			bindFunction(device, "change", this.pointerMove.bind(this));
			bindFunction(device, "end", this.pointerUp.bind(this));
			bindFunction(device, "cancel", this.pointerUp.bind(this));
			bindFunction("lostPointerCapture", "", this.pointerUp.bind(this));
		}
		if (this.config.keys) {
			bindFunction("key", "down", this.keyDown.bind(this));
			bindFunction("key", "up", this.keyUp.bind(this));
		}
		if (this.config.filterTaps) bindFunction("click", "", this.pointerClick.bind(this), {
			capture: true,
			passive: false
		});
	}
};
function persistEvent(event) {
	"persist" in event && typeof event.persist === "function" && event.persist();
}
var isBrowser = typeof window !== "undefined" && window.document && window.document.createElement;
function supportsTouchEvents() {
	return isBrowser && "ontouchstart" in window;
}
function isTouchScreen() {
	return supportsTouchEvents() || isBrowser && window.navigator.maxTouchPoints > 1;
}
function supportsPointerEvents() {
	return isBrowser && "onpointerdown" in window;
}
function supportsPointerLock() {
	return isBrowser && "exitPointerLock" in window.document;
}
function supportsGestureEvents() {
	try {
		return "constructor" in GestureEvent;
	} catch (e) {
		return false;
	}
}
var SUPPORT = {
	isBrowser,
	gesture: supportsGestureEvents(),
	touch: supportsTouchEvents(),
	touchscreen: isTouchScreen(),
	pointer: supportsPointerEvents(),
	pointerLock: supportsPointerLock()
};
var DEFAULT_PREVENT_SCROLL_DELAY = 250;
var DEFAULT_DRAG_DELAY = 180;
var DEFAULT_SWIPE_VELOCITY = .5;
var DEFAULT_SWIPE_DISTANCE = 50;
var DEFAULT_SWIPE_DURATION = 250;
var DEFAULT_KEYBOARD_DISPLACEMENT = 10;
var DEFAULT_DRAG_AXIS_THRESHOLD = {
	mouse: 0,
	touch: 0,
	pen: 8
};
var dragConfigResolver = _objectSpread2$1(_objectSpread2$1({}, coordinatesConfigResolver), {}, {
	device(_v, _k, { pointer: { touch = false, lock = false, mouse = false } = {} }) {
		this.pointerLock = lock && SUPPORT.pointerLock;
		if (SUPPORT.touch && touch) return "touch";
		if (this.pointerLock) return "mouse";
		if (SUPPORT.pointer && !mouse) return "pointer";
		if (SUPPORT.touch) return "touch";
		return "mouse";
	},
	preventScrollAxis(value, _k, { preventScroll }) {
		this.preventScrollDelay = typeof preventScroll === "number" ? preventScroll : preventScroll || preventScroll === void 0 && value ? DEFAULT_PREVENT_SCROLL_DELAY : void 0;
		if (!SUPPORT.touchscreen || preventScroll === false) return void 0;
		return value ? value : preventScroll !== void 0 ? "y" : void 0;
	},
	pointerCapture(_v, _k, { pointer: { capture = true, buttons = 1, keys = true } = {} }) {
		this.pointerButtons = buttons;
		this.keys = keys;
		return !this.pointerLock && this.device === "pointer" && capture;
	},
	threshold(value, _k, { filterTaps = false, tapsThreshold = 3, axis = void 0 }) {
		const threshold = V$1.toVector(value, filterTaps ? tapsThreshold : axis ? 1 : 0);
		this.filterTaps = filterTaps;
		this.tapsThreshold = tapsThreshold;
		return threshold;
	},
	swipe({ velocity = DEFAULT_SWIPE_VELOCITY, distance = DEFAULT_SWIPE_DISTANCE, duration = DEFAULT_SWIPE_DURATION } = {}) {
		return {
			velocity: this.transform(V$1.toVector(velocity)),
			distance: this.transform(V$1.toVector(distance)),
			duration
		};
	},
	delay(value = 0) {
		switch (value) {
			case true: return DEFAULT_DRAG_DELAY;
			case false: return 0;
			default: return value;
		}
	},
	axisThreshold(value) {
		if (!value) return DEFAULT_DRAG_AXIS_THRESHOLD;
		return _objectSpread2$1(_objectSpread2$1({}, DEFAULT_DRAG_AXIS_THRESHOLD), value);
	},
	keyboardDisplacement(value = DEFAULT_KEYBOARD_DISPLACEMENT) {
		return value;
	}
});
_objectSpread2$1(_objectSpread2$1({}, commonConfigResolver), {}, {
	device(_v, _k, { shared, pointer: { touch = false } = {} }) {
		if (shared.target && !SUPPORT.touch && SUPPORT.gesture) return "gesture";
		if (SUPPORT.touch && touch) return "touch";
		if (SUPPORT.touchscreen) {
			if (SUPPORT.pointer) return "pointer";
			if (SUPPORT.touch) return "touch";
		}
	},
	bounds(_v, _k, { scaleBounds = {}, angleBounds = {} }) {
		const _scaleBounds = (state) => {
			const D = assignDefault(call(scaleBounds, state), {
				min: -Infinity,
				max: Infinity
			});
			return [D.min, D.max];
		};
		const _angleBounds = (state) => {
			const A = assignDefault(call(angleBounds, state), {
				min: -Infinity,
				max: Infinity
			});
			return [A.min, A.max];
		};
		if (typeof scaleBounds !== "function" && typeof angleBounds !== "function") return [_scaleBounds(), _angleBounds()];
		return (state) => [_scaleBounds(state), _angleBounds(state)];
	},
	threshold(value, _k, config) {
		this.lockDirection = config.axis === "lock";
		return V$1.toVector(value, this.lockDirection ? [.1, 3] : 0);
	},
	modifierKey(value) {
		if (value === void 0) return "ctrlKey";
		return value;
	},
	pinchOnWheel(value = true) {
		return value;
	}
});
_objectSpread2$1(_objectSpread2$1({}, coordinatesConfigResolver), {}, { mouseOnly: (value = true) => value });
_objectSpread2$1(_objectSpread2$1({}, coordinatesConfigResolver), {}, { mouseOnly: (value = true) => value });
var EngineMap = /* @__PURE__ */ new Map();
var ConfigResolverMap = /* @__PURE__ */ new Map();
function registerAction(action) {
	EngineMap.set(action.key, action.engine);
	ConfigResolverMap.set(action.key, action.resolver);
}
var dragAction = {
	key: "drag",
	engine: DragEngine,
	resolver: dragConfigResolver
};
//#endregion
//#region node_modules/@use-gesture/core/dist/use-gesture-core.esm.js
function _objectWithoutPropertiesLoose$2(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i = 0;
	for (; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
function _objectWithoutProperties$2(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose$2(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
var sharedConfigResolver = {
	target(value) {
		if (value) return () => "current" in value ? value.current : value;
	},
	enabled(value = true) {
		return value;
	},
	window(value = SUPPORT.isBrowser ? window : void 0) {
		return value;
	},
	eventOptions({ passive = true, capture = false } = {}) {
		return {
			passive,
			capture
		};
	},
	transform(value) {
		return value;
	}
};
var _excluded$11 = [
	"target",
	"eventOptions",
	"window",
	"enabled",
	"transform"
];
function resolveWith(config = {}, resolvers) {
	const result = {};
	for (const [key, resolver] of Object.entries(resolvers)) switch (typeof resolver) {
		case "function":
			result[key] = resolver.call(result, config[key], key, config);
			break;
		case "object":
			result[key] = resolveWith(config[key], resolver);
			break;
		case "boolean": if (resolver) result[key] = config[key];
	}
	return result;
}
function parse$1(newConfig, gestureKey, _config = {}) {
	const _ref = newConfig, { target, eventOptions, window, enabled, transform } = _ref, rest = _objectWithoutProperties$2(_ref, _excluded$11);
	_config.shared = resolveWith({
		target,
		eventOptions,
		window,
		enabled,
		transform
	}, sharedConfigResolver);
	if (gestureKey) {
		const resolver = ConfigResolverMap.get(gestureKey);
		_config[gestureKey] = resolveWith(_objectSpread2$1({ shared: _config.shared }, rest), resolver);
	} else for (const key in rest) {
		const resolver = ConfigResolverMap.get(key);
		if (resolver) _config[key] = resolveWith(_objectSpread2$1({ shared: _config.shared }, rest[key]), resolver);
	}
	return _config;
}
var EventStore = class {
	constructor(ctrl, gestureKey) {
		_defineProperty$3(this, "_listeners", /* @__PURE__ */ new Set());
		this._ctrl = ctrl;
		this._gestureKey = gestureKey;
	}
	add(element, device, action, handler, options) {
		const listeners = this._listeners;
		const type = toDomEventType(device, action);
		const eventOptions = _objectSpread2$1(_objectSpread2$1({}, this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {}), options);
		element.addEventListener(type, handler, eventOptions);
		const remove = () => {
			element.removeEventListener(type, handler, eventOptions);
			listeners.delete(remove);
		};
		listeners.add(remove);
		return remove;
	}
	clean() {
		this._listeners.forEach((remove) => remove());
		this._listeners.clear();
	}
};
var TimeoutStore = class {
	constructor() {
		_defineProperty$3(this, "_timeouts", /* @__PURE__ */ new Map());
	}
	add(key, callback, ms = 140, ...args) {
		this.remove(key);
		this._timeouts.set(key, window.setTimeout(callback, ms, ...args));
	}
	remove(key) {
		const timeout = this._timeouts.get(key);
		if (timeout) window.clearTimeout(timeout);
	}
	clean() {
		this._timeouts.forEach((timeout) => void window.clearTimeout(timeout));
		this._timeouts.clear();
	}
};
var Controller = class {
	constructor(handlers) {
		_defineProperty$3(this, "gestures", /* @__PURE__ */ new Set());
		_defineProperty$3(this, "_targetEventStore", new EventStore(this));
		_defineProperty$3(this, "gestureEventStores", {});
		_defineProperty$3(this, "gestureTimeoutStores", {});
		_defineProperty$3(this, "handlers", {});
		_defineProperty$3(this, "config", {});
		_defineProperty$3(this, "pointerIds", /* @__PURE__ */ new Set());
		_defineProperty$3(this, "touchIds", /* @__PURE__ */ new Set());
		_defineProperty$3(this, "state", { shared: {
			shiftKey: false,
			metaKey: false,
			ctrlKey: false,
			altKey: false
		} });
		resolveGestures(this, handlers);
	}
	setEventIds(event) {
		if (isTouch(event)) {
			this.touchIds = new Set(touchIds(event));
			return this.touchIds;
		} else if ("pointerId" in event) {
			if (event.type === "pointerup" || event.type === "pointercancel") this.pointerIds.delete(event.pointerId);
			else if (event.type === "pointerdown") this.pointerIds.add(event.pointerId);
			return this.pointerIds;
		}
	}
	applyHandlers(handlers, nativeHandlers) {
		this.handlers = handlers;
		this.nativeHandlers = nativeHandlers;
	}
	applyConfig(config, gestureKey) {
		this.config = parse$1(config, gestureKey, this.config);
	}
	clean() {
		this._targetEventStore.clean();
		for (const key of this.gestures) {
			this.gestureEventStores[key].clean();
			this.gestureTimeoutStores[key].clean();
		}
	}
	effect() {
		if (this.config.shared.target) this.bind();
		return () => this._targetEventStore.clean();
	}
	bind(...args) {
		const sharedConfig = this.config.shared;
		const props = {};
		let target;
		if (sharedConfig.target) {
			target = sharedConfig.target();
			if (!target) return;
		}
		if (sharedConfig.enabled) {
			for (const gestureKey of this.gestures) {
				const gestureConfig = this.config[gestureKey];
				const bindFunction = bindToProps(props, gestureConfig.eventOptions, !!target);
				if (gestureConfig.enabled) new (EngineMap.get(gestureKey))(this, args, gestureKey).bind(bindFunction);
			}
			const nativeBindFunction = bindToProps(props, sharedConfig.eventOptions, !!target);
			for (const eventKey in this.nativeHandlers) nativeBindFunction(eventKey, "", (event) => this.nativeHandlers[eventKey](_objectSpread2$1(_objectSpread2$1({}, this.state.shared), {}, {
				event,
				args
			})), void 0, true);
		}
		for (const handlerProp in props) props[handlerProp] = chain(...props[handlerProp]);
		if (!target) return props;
		for (const handlerProp in props) {
			const { device, capture, passive } = parseProp(handlerProp);
			this._targetEventStore.add(target, device, "", props[handlerProp], {
				capture,
				passive
			});
		}
	}
};
function setupGesture(ctrl, gestureKey) {
	ctrl.gestures.add(gestureKey);
	ctrl.gestureEventStores[gestureKey] = new EventStore(ctrl, gestureKey);
	ctrl.gestureTimeoutStores[gestureKey] = new TimeoutStore();
}
function resolveGestures(ctrl, internalHandlers) {
	if (internalHandlers.drag) setupGesture(ctrl, "drag");
	if (internalHandlers.wheel) setupGesture(ctrl, "wheel");
	if (internalHandlers.scroll) setupGesture(ctrl, "scroll");
	if (internalHandlers.move) setupGesture(ctrl, "move");
	if (internalHandlers.pinch) setupGesture(ctrl, "pinch");
	if (internalHandlers.hover) setupGesture(ctrl, "hover");
}
var bindToProps = (props, eventOptions, withPassiveOption) => (device, action, handler, options = {}, isNative = false) => {
	var _options$capture, _options$passive;
	const capture = (_options$capture = options.capture) !== null && _options$capture !== void 0 ? _options$capture : eventOptions.capture;
	const passive = (_options$passive = options.passive) !== null && _options$passive !== void 0 ? _options$passive : eventOptions.passive;
	let handlerProp = isNative ? device : toHandlerProp(device, action, capture);
	if (withPassiveOption && passive) handlerProp += "Passive";
	props[handlerProp] = props[handlerProp] || [];
	props[handlerProp].push(handler);
};
//#endregion
//#region node_modules/@use-gesture/react/dist/use-gesture-react.esm.js
function useRecognizers(handlers, config = {}, gestureKey, nativeHandlers) {
	const ctrl = import_react.useMemo(() => new Controller(handlers), []);
	ctrl.applyHandlers(handlers, nativeHandlers);
	ctrl.applyConfig(config, gestureKey);
	import_react.useEffect(ctrl.effect.bind(ctrl));
	import_react.useEffect(() => {
		return ctrl.clean.bind(ctrl);
	}, []);
	if (config.target === void 0) return ctrl.bind.bind(ctrl);
}
function useDrag$1(handler, config) {
	registerAction(dragAction);
	return useRecognizers({ drag: handler }, config || {}, "drag");
}
//#endregion
//#region node_modules/leva/dist/vector-plugin-5e122f40.esm.js
function _objectWithoutPropertiesLoose$1(r, e) {
	if (null == r) return {};
	var t = {};
	for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
		if (-1 !== e.indexOf(n)) continue;
		t[n] = r[n];
	}
	return t;
}
function _objectWithoutProperties$1(e, t) {
	if (null == e) return {};
	var o, r, i = _objectWithoutPropertiesLoose$1(e, t);
	if (Object.getOwnPropertySymbols) {
		var n = Object.getOwnPropertySymbols(e);
		for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
	}
	return i;
}
var LevaErrors = function(LevaErrors) {
	LevaErrors[LevaErrors["UNSUPPORTED_INPUT"] = 0] = "UNSUPPORTED_INPUT";
	LevaErrors[LevaErrors["NO_COMPONENT_FOR_TYPE"] = 1] = "NO_COMPONENT_FOR_TYPE";
	LevaErrors[LevaErrors["UNKNOWN_INPUT"] = 2] = "UNKNOWN_INPUT";
	LevaErrors[LevaErrors["DUPLICATE_KEYS"] = 3] = "DUPLICATE_KEYS";
	LevaErrors[LevaErrors["ALREADY_REGISTERED_TYPE"] = 4] = "ALREADY_REGISTERED_TYPE";
	LevaErrors[LevaErrors["CLIPBOARD_ERROR"] = 5] = "CLIPBOARD_ERROR";
	LevaErrors[LevaErrors["THEME_ERROR"] = 6] = "THEME_ERROR";
	LevaErrors[LevaErrors["PATH_DOESNT_EXIST"] = 7] = "PATH_DOESNT_EXIST";
	LevaErrors[LevaErrors["INPUT_TYPE_OVERRIDE"] = 8] = "INPUT_TYPE_OVERRIDE";
	LevaErrors[LevaErrors["EMPTY_KEY"] = 9] = "EMPTY_KEY";
	return LevaErrors;
}({});
var ErrorList = {
	[LevaErrors.UNSUPPORTED_INPUT]: (type, path) => [`An input with type \`${type}\` input was found at path \`${path}\` but it's not supported yet.`],
	[LevaErrors.NO_COMPONENT_FOR_TYPE]: (type, path) => [`Type \`${type}\` found at path \`${path}\` can't be displayed in panel because no component supports it yet.`],
	[LevaErrors.UNKNOWN_INPUT]: (path, value) => [`input at path \`${path}\` is not recognized.`, value],
	[LevaErrors.DUPLICATE_KEYS]: (key, path, prevPath) => [`Key \`${key}\` of path \`${path}\` already exists at path \`${prevPath}\`. Even nested keys need to be unique. Rename one of the keys.`],
	[LevaErrors.ALREADY_REGISTERED_TYPE]: (type) => [`Type ${type} has already been registered. You can't register a component with the same type.`],
	[LevaErrors.CLIPBOARD_ERROR]: (value) => [`Error copying the value`, value],
	[LevaErrors.THEME_ERROR]: (category, key) => [`Error accessing the theme \`${category}.${key}\` value.`],
	[LevaErrors.PATH_DOESNT_EXIST]: (path) => [`Error getting the value at path \`${path}\`. There is probably an error in your \`render\` function.`],
	[LevaErrors.INPUT_TYPE_OVERRIDE]: (path, type, wrongType) => [`Input at path \`${path}\` already exists with type: \`${type}\`. Its type cannot be overridden with type \`${wrongType}\`.`],
	[LevaErrors.EMPTY_KEY]: () => ["Keys can not be empty, if you want to hide a label use whitespace."]
};
function _log(fn, errorType, ...args) {
	const errorFn = ErrorList[errorType];
	const [message, ...rest] = errorFn(...args);
	console[fn]("LEVA: " + message, ...rest);
}
var warn = _log.bind(null, "warn");
var log = _log.bind(null, "log");
var _excluded$a = ["value"];
var _excluded2$4 = ["schema"];
var _excluded3$1 = ["value"];
var Schemas = [];
var Plugins = {};
function getValueType(_ref) {
	let { value } = _ref, settings = _objectWithoutProperties$1(_ref, _excluded$a);
	for (let checker of Schemas) {
		const type = checker(value, settings);
		if (type) return type;
	}
}
function register(type, _ref2) {
	let { schema } = _ref2, plugin = _objectWithoutProperties$1(_ref2, _excluded2$4);
	if (type in Plugins) {
		warn(LevaErrors.ALREADY_REGISTERED_TYPE, type);
		return;
	}
	Schemas.push((value, settings) => schema(value, settings) && type);
	Plugins[type] = plugin;
}
function createInternalPlugin(plugin) {
	return plugin;
}
function normalize$3$1(type, input, path, data) {
	const { normalize: _normalize } = Plugins[type];
	if (_normalize) return _normalize(input, path, data);
	if (typeof input !== "object" || !("value" in input)) return { value: input };
	const { value } = input;
	return {
		value,
		settings: _objectWithoutProperties$1(input, _excluded3$1)
	};
}
function sanitize$4(type, value, settings, prevValue, path, store) {
	const { sanitize } = Plugins[type];
	if (sanitize) return sanitize(value, settings, prevValue, path, store);
	return value;
}
function format$2(type, value, settings) {
	const { format } = Plugins[type];
	if (format) return format(value, settings);
	return value;
}
function _toPrimitive(t, r) {
	if ("object" != typeof t || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != typeof i) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
	var i = _toPrimitive(t, "string");
	return "symbol" == typeof i ? i : i + "";
}
function _defineProperty$2(e, r, t) {
	return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
function ownKeys$2(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys$2(Object(t), !0).forEach(function(r) {
			_defineProperty$2(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
var clamp = (x, min, max) => x > max ? max : x < min ? min : x;
var parseNumber = (v) => {
	if (v === "" || typeof v === "number") return v;
	try {
		const _v = evaluate(v);
		if (!isNaN(_v)) return _v;
	} catch (_unused) {}
	return parseFloat(v);
};
var log10 = Math.log(10);
function getStep(number) {
	let n = Math.abs(+String(number).replace(".", ""));
	if (n === 0) return .01;
	while (n !== 0 && n % 10 === 0) n /= 10;
	const significantDigits = Math.floor(Math.log(n) / log10) + 1;
	const step = Math.pow(10, Math.floor(Math.log10(Math.abs(number))) - significantDigits);
	return Math.max(step, .001);
}
var range = (v, min, max) => {
	if (max === min) return 0;
	return (clamp(v, min, max) - min) / (max - min);
};
var invertedRange = (p, min, max) => p * (max - min) + min;
var getUid = () => "_" + Math.random().toString(36).substr(2, 9);
var parens = /\(([^\(\)]+)\)/;
var exp = /(-?\d+(?:\.\d+)?)\s*\^\s*(-?\d+(?:\.\d+)?)/;
var muldiv = /(-?\d+(?:\.\d+)?)\s*([*/])\s*(-?\d+(?:\.\d+)?)/;
var addsub = /(-?\d+(?:\.\d+)?)\s*([+-])\s*(-?\d+(?:\.\d+)?)/;
function evaluate(expr) {
	expr = expr.replace(/\s+/g, "");
	if (parens.test(expr)) return evaluate(expr.replace(parens, (_, subExpr) => evaluate(subExpr).toString()));
	if (exp.test(expr)) return evaluate(expr.replace(exp, (_, a, b) => Math.pow(Number(a), Number(b)).toString()));
	if (muldiv.test(expr)) return evaluate(expr.replace(muldiv, (_, a, op, b) => op === "*" ? (Number(a) * Number(b)).toString() : Number(b) === 0 ? (() => {
		throw new Error("Division by zero");
	})() : (Number(a) / Number(b)).toString()));
	if (addsub.test(expr)) return evaluate(expr.replace(addsub, (_, a, op, b) => op === "+" ? (Number(a) + Number(b)).toString() : (Number(a) - Number(b)).toString()));
	return Number(expr);
}
function omit(object, keys) {
	const obj = _objectSpread2({}, object);
	keys.forEach((k) => k in object && delete obj[k]);
	return obj;
}
function mapArrayToKeys(value, keys) {
	return value.reduce((acc, v, i) => Object.assign(acc, { [keys[i]]: v }), {});
}
function isObject$1(variable) {
	return Object.prototype.toString.call(variable) === "[object Object]";
}
var isEmptyObject = (obj) => isObject$1(obj) && Object.keys(obj).length === 0;
var SpecialInputs = function(SpecialInputs) {
	SpecialInputs["BUTTON"] = "BUTTON";
	SpecialInputs["BUTTON_GROUP"] = "BUTTON_GROUP";
	SpecialInputs["MONITOR"] = "MONITOR";
	SpecialInputs["FOLDER"] = "FOLDER";
	return SpecialInputs;
}({});
var LevaInputs = function(LevaInputs) {
	LevaInputs["SELECT"] = "SELECT";
	LevaInputs["IMAGE"] = "IMAGE";
	LevaInputs["NUMBER"] = "NUMBER";
	LevaInputs["COLOR"] = "COLOR";
	LevaInputs["STRING"] = "STRING";
	LevaInputs["BOOLEAN"] = "BOOLEAN";
	LevaInputs["INTERVAL"] = "INTERVAL";
	LevaInputs["VECTOR3D"] = "VECTOR3D";
	LevaInputs["VECTOR2D"] = "VECTOR2D";
	return LevaInputs;
}({});
var _excluded$9 = ["type", "__customInput"];
var _excluded2$3 = [
	"render",
	"label",
	"optional",
	"order",
	"disabled",
	"hint",
	"onChange",
	"onEditStart",
	"onEditEnd",
	"transient"
];
var _excluded3$2 = ["type"];
function parseOptions(_input, key, mergedOptions = {}, customType) {
	var _commonOptions$option, _commonOptions$disabl;
	if (typeof _input !== "object" || Array.isArray(_input)) return {
		type: customType,
		input: _input,
		options: _objectSpread2({
			key,
			label: key,
			optional: false,
			disabled: false,
			order: 0
		}, mergedOptions)
	};
	if ("__customInput" in _input) {
		const { type: _type, __customInput } = _input;
		return parseOptions(__customInput, key, _objectWithoutProperties$1(_input, _excluded$9), _type);
	}
	const { render, label, optional, order = 0, disabled, hint, onChange, onEditStart, onEditEnd, transient } = _input, inputWithType = _objectWithoutProperties$1(_input, _excluded2$3);
	const commonOptions = _objectSpread2({
		render,
		key,
		label: label !== null && label !== void 0 ? label : key,
		hint,
		transient: transient !== null && transient !== void 0 ? transient : !!onChange,
		onEditStart,
		onEditEnd,
		disabled,
		optional,
		order
	}, mergedOptions);
	let { type } = inputWithType, input = _objectWithoutProperties$1(inputWithType, _excluded3$2);
	type = customType !== null && customType !== void 0 ? customType : type;
	if (type in SpecialInputs) return {
		type,
		input,
		options: commonOptions
	};
	let computedInput;
	if (customType && isObject$1(input) && "value" in input) computedInput = input.value;
	else computedInput = isEmptyObject(input) ? void 0 : input;
	return {
		type,
		input: computedInput,
		options: _objectSpread2(_objectSpread2({}, commonOptions), {}, {
			onChange,
			optional: (_commonOptions$option = commonOptions.optional) !== null && _commonOptions$option !== void 0 ? _commonOptions$option : false,
			disabled: (_commonOptions$disabl = commonOptions.disabled) !== null && _commonOptions$disabl !== void 0 ? _commonOptions$disabl : false
		})
	};
}
function normalizeInput(_input, key, path, data) {
	const parsedInputAndOptions = parseOptions(_input, key);
	const { type, input: parsedInput, options } = parsedInputAndOptions;
	if (type) {
		if (type in SpecialInputs) return parsedInputAndOptions;
		return {
			type,
			input: normalize$3$1(type, parsedInput, path, data),
			options
		};
	}
	let inputType = getValueType(parsedInput);
	if (inputType) return {
		type: inputType,
		input: normalize$3$1(inputType, parsedInput, path, data),
		options
	};
	inputType = getValueType({ value: parsedInput });
	if (inputType) return {
		type: inputType,
		input: normalize$3$1(inputType, { value: parsedInput }, path, data),
		options
	};
	return false;
}
function updateInput(input, newValue, path, store, fromPanel) {
	const { value, type, settings } = input;
	input.value = sanitizeValue({
		type,
		value,
		settings
	}, newValue, path, store);
	input.fromPanel = fromPanel;
}
var ValueError = function ValueError(message, value, error) {
	this.type = "LEVA_ERROR";
	this.message = "LEVA: " + message;
	this.previousValue = value;
	this.error = error;
};
function sanitizeValue({ type, value, settings }, newValue, path, store) {
	const _newValue = type !== "SELECT" && typeof newValue === "function" ? newValue(value) : newValue;
	let sanitizedNewValue;
	try {
		sanitizedNewValue = sanitize$4(type, _newValue, settings, value, path, store);
	} catch (e) {
		throw new ValueError(`The value \`${newValue}\` did not result in a correct value.`, value, e);
	}
	if (dequal(sanitizedNewValue, value)) return value;
	return sanitizedNewValue;
}
var debounce = (callback, wait, immediate = false) => {
	let timeout = 0;
	return function() {
		const args = arguments;
		const callNow = immediate && !timeout;
		const next = () => callback.apply(this, args);
		window.clearTimeout(timeout);
		timeout = window.setTimeout(next, wait);
		if (callNow) next();
	};
};
var multiplyStep = (event) => event.shiftKey ? 5 : event.altKey ? 1 / 5 : 1;
var _excluded$8 = ["value"];
var _excluded2$2$1 = ["min", "max"];
var schema$3 = (v) => {
	if (typeof v === "number") return true;
	if (typeof v === "string") {
		const _v = parseFloat(v);
		if (isNaN(_v)) return false;
		return v.substring(("" + _v).length).trim().length < 4;
	}
	return false;
};
var sanitize$3 = (v, { min: _min = -Infinity, max: _max = Infinity, suffix }) => {
	const _v = parseFloat(v);
	if (v === "" || isNaN(_v)) throw Error("Invalid number");
	const f = clamp(_v, _min, _max);
	return suffix ? f + suffix : f;
};
var format$1$1 = (v, { pad: _pad = 0, suffix }) => {
	const f = parseFloat(v).toFixed(_pad);
	return suffix ? f + suffix : f;
};
var normalize$2$1 = (_ref) => {
	let { value } = _ref, settings = _objectWithoutProperties$1(_ref, _excluded$8);
	const { min = -Infinity, max = Infinity } = settings, _settings = _objectWithoutProperties$1(settings, _excluded2$2$1);
	let _value = parseFloat(value);
	const suffix = typeof value === "string" ? value.substring(("" + _value).length) : void 0;
	_value = clamp(_value, min, max);
	let step = settings.step;
	if (!step) {
		if (Number.isFinite(min)) {
			if (Number.isFinite(max)) step = +(Math.abs(max - min) / 100).toPrecision(1);
			else step = +(Math.abs(_value - min) / 100).toPrecision(1);
		} else if (Number.isFinite(max)) step = +(Math.abs(max - _value) / 100).toPrecision(1);
	}
	const padStep = step ? getStep(step) * 10 : getStep(_value);
	step = step || padStep / 10;
	const pad = Math.round(clamp(Math.log10(1 / padStep), 0, 2));
	return {
		value: suffix ? _value + suffix : _value,
		settings: _objectSpread2({
			initialValue: _value,
			step,
			pad,
			min,
			max,
			suffix
		}, _settings)
	};
};
var sanitizeStep$1 = (v, { step, initialValue }) => {
	return initialValue + Math.round((v - initialValue) / step) * step;
};
var props$3 = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	schema: schema$3,
	sanitize: sanitize$3,
	format: format$1$1,
	normalize: normalize$2$1,
	sanitizeStep: sanitizeStep$1
});
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
var InputContext = (0, import_react.createContext)({});
function useInputContext() {
	return (0, import_react.useContext)(InputContext);
}
var ThemeContext = (0, import_react.createContext)(null);
var StoreContext = (0, import_react.createContext)(null);
var PanelSettingsContext = (0, import_react.createContext)(null);
function useStoreContext() {
	return (0, import_react.useContext)(StoreContext);
}
function usePanelSettingsContext() {
	return (0, import_react.useContext)(PanelSettingsContext);
}
var getDefaultTheme = () => ({
	colors: {
		elevation1: "#292d39",
		elevation2: "#181c20",
		elevation3: "#373c4b",
		accent1: "#0066dc",
		accent2: "#007bff",
		accent3: "#3c93ff",
		highlight1: "#535760",
		highlight2: "#8c92a4",
		highlight3: "#fefefe",
		vivid1: "#ffcc00",
		folderWidgetColor: "$highlight2",
		folderTextColor: "$highlight3",
		toolTipBackground: "$highlight3",
		toolTipText: "$elevation2"
	},
	radii: {
		xs: "2px",
		sm: "3px",
		lg: "10px"
	},
	space: {
		xs: "3px",
		sm: "6px",
		md: "10px",
		rowGap: "7px",
		colGap: "7px"
	},
	fonts: {
		mono: `ui-monospace, SFMono-Regular, Menlo, 'Roboto Mono', monospace`,
		sans: `system-ui, sans-serif`
	},
	fontSizes: {
		root: "11px",
		toolTip: "$root"
	},
	sizes: {
		rootWidth: "280px",
		controlWidth: "160px",
		numberInputMinWidth: "38px",
		scrubberWidth: "8px",
		scrubberHeight: "16px",
		rowHeight: "24px",
		folderTitleHeight: "20px",
		checkboxSize: "16px",
		joystickWidth: "100px",
		joystickHeight: "100px",
		colorPickerWidth: "$controlWidth",
		colorPickerHeight: "100px",
		imagePreviewWidth: "$controlWidth",
		imagePreviewHeight: "100px",
		monitorHeight: "60px",
		titleBarHeight: "39px"
	},
	shadows: {
		level1: "0 0 9px 0 #00000088",
		level2: "0 4px 14px #00000033"
	},
	borderWidths: {
		root: "0px",
		input: "1px",
		focus: "1px",
		hover: "1px",
		active: "1px",
		folder: "1px"
	},
	fontWeights: {
		label: "normal",
		folder: "normal",
		button: "normal"
	}
});
function createStateClass(value, options) {
	const [borderColor, bgColor] = value.split(" ");
	const css = {};
	if (borderColor !== "none") css.boxShadow = `${options.inset ? "inset " : ""}0 0 0 $borderWidths${[options.key]} $colors${borderColor !== "default" && borderColor || options.borderColor}`;
	if (bgColor) css.backgroundColor = bgColor;
	return css;
}
var utils = {
	$inputStyle: () => (value) => createStateClass(value, {
		key: "$input",
		borderColor: "$highlight1",
		inset: true
	}),
	$focusStyle: () => (value) => createStateClass(value, {
		key: "$focus",
		borderColor: "$accent2"
	}),
	$hoverStyle: () => (value) => createStateClass(value, {
		key: "$hover",
		borderColor: "$accent1",
		inset: true
	}),
	$activeStyle: () => (value) => createStateClass(value, {
		key: "$active",
		borderColor: "$accent1",
		inset: true
	})
};
var stitches = q$2({
	prefix: "leva",
	theme: getDefaultTheme(),
	utils: _objectSpread2(_objectSpread2({}, utils), {}, {
		$flex: () => ({
			display: "flex",
			alignItems: "center"
		}),
		$flexCenter: () => ({
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		}),
		$reset: () => ({
			outline: "none",
			fontSize: "inherit",
			fontWeight: "inherit",
			color: "inherit",
			fontFamily: "inherit",
			border: "none",
			backgroundColor: "transparent",
			appearance: "none"
		}),
		$draggable: () => ({
			touchAction: "none",
			WebkitUserDrag: "none",
			userSelect: "none"
		}),
		$focus: (value) => ({ "&:focus": utils.$focusStyle()(value) }),
		$focusWithin: (value) => ({ "&:focus-within": utils.$focusStyle()(value) }),
		$hover: (value) => ({ "&:hover": utils.$hoverStyle()(value) }),
		$active: (value) => ({ "&:active": utils.$activeStyle()(value) })
	})
});
var styled = stitches.styled;
stitches.css;
stitches.createTheme;
var globalCss = stitches.globalCss;
stitches.keyframes;
var globalStyles = globalCss({ ".leva__panel__dragged": {
	WebkitUserDrag: "none",
	userSelect: "none",
	input: { userSelect: "none" },
	"*": { cursor: "ew-resize !important" }
} });
function useTh(category, key) {
	const { theme } = (0, import_react.useContext)(ThemeContext);
	if (!(category in theme) || !(key in theme[category])) {
		warn(LevaErrors.THEME_ERROR, category, key);
		return "";
	}
	let _key = key;
	while (true) {
		let value = theme[category][_key];
		if (typeof value === "string" && value.charAt(0) === "$") _key = value.substr(1);
		else return value;
	}
}
var StyledInput = styled("input", {
	$reset: "",
	padding: "0 $sm",
	width: 0,
	minWidth: 0,
	flex: 1,
	height: "100%",
	variants: {
		levaType: { number: { textAlign: "right" } },
		as: { textarea: { padding: "$sm" } }
	}
});
var InnerLabel = styled("div", {
	$draggable: "",
	height: "100%",
	$flexCenter: "",
	position: "relative",
	padding: "0 $xs",
	fontSize: "0.8em",
	opacity: .8,
	cursor: "default",
	touchAction: "none",
	[`& + ${StyledInput}`]: { paddingLeft: 0 }
});
var InnerNumberLabel = styled(InnerLabel, {
	cursor: "ew-resize",
	marginRight: "-$xs",
	textTransform: "uppercase",
	opacity: .3,
	"&:hover": { opacity: 1 },
	variants: { dragging: { true: {
		backgroundColor: "$accent2",
		opacity: 1
	} } }
});
var InputContainer = styled("div", {
	$flex: "",
	position: "relative",
	borderRadius: "$sm",
	overflow: "hidden",
	color: "inherit",
	height: "$rowHeight",
	backgroundColor: "$elevation3",
	$inputStyle: "$elevation1",
	$hover: "",
	$focusWithin: "",
	variants: { textArea: { true: { height: "auto" } } }
});
var _excluded$7$1 = [
	"innerLabel",
	"value",
	"onUpdate",
	"onChange",
	"onKeyDown",
	"type",
	"id",
	"inputType",
	"rows"
];
var _excluded2$1$3 = ["onUpdate"];
function ValueInput(_ref) {
	let { innerLabel, value, onUpdate, onChange, onKeyDown, type, id, inputType = "text", rows = 0 } = _ref, props = _objectWithoutProperties$1(_ref, _excluded$7$1);
	const { id: _id, emitOnEditStart, emitOnEditEnd, disabled } = useInputContext();
	const inputId = id || _id;
	const inputRef = (0, import_react.useRef)(null);
	const isTextArea = rows > 0;
	const asType = isTextArea ? "textarea" : "input";
	const update = (0, import_react.useCallback)((fn) => (event) => {
		const _value = event.currentTarget.value;
		fn(_value);
	}, []);
	import_react.useEffect(() => {
		const ref = inputRef.current;
		const _onUpdate = update((value) => {
			onUpdate(value);
			emitOnEditEnd();
		});
		ref === null || ref === void 0 || ref.addEventListener("blur", _onUpdate);
		return () => ref === null || ref === void 0 ? void 0 : ref.removeEventListener("blur", _onUpdate);
	}, [
		update,
		onUpdate,
		emitOnEditEnd
	]);
	const onKeyPress = (0, import_react.useCallback)((event) => {
		if (event.key === "Enter") update(onUpdate)(event);
	}, [update, onUpdate]);
	const inputProps = Object.assign({ as: asType }, isTextArea ? { rows } : {}, props);
	return import_react.createElement(InputContainer, { textArea: isTextArea }, innerLabel && typeof innerLabel === "string" ? import_react.createElement(InnerLabel, null, innerLabel) : innerLabel, import_react.createElement(StyledInput, _extends({
		levaType: type,
		ref: inputRef,
		id: inputId,
		type: inputType,
		autoComplete: "off",
		spellCheck: "false",
		value,
		onChange: update(onChange),
		onFocus: () => emitOnEditStart(),
		onKeyPress,
		onKeyDown,
		disabled
	}, inputProps)));
}
function NumberInput(_ref2) {
	let { onUpdate } = _ref2, props = _objectWithoutProperties$1(_ref2, _excluded2$1$3);
	const _onUpdate = (0, import_react.useCallback)((v) => onUpdate(parseNumber(v)), [onUpdate]);
	const onKeyDown = (0, import_react.useCallback)((event) => {
		const dir = event.key === "ArrowUp" ? 1 : event.key === "ArrowDown" ? -1 : 0;
		if (dir) {
			event.preventDefault();
			const step = event.altKey ? .1 : event.shiftKey ? 10 : 1;
			onUpdate((v) => parseFloat(v) + dir * step);
		}
	}, [onUpdate]);
	return import_react.createElement(ValueInput, _extends({}, props, {
		onUpdate: _onUpdate,
		onKeyDown,
		type: "number"
	}));
}
var StyledFolder = styled("div", {});
var StyledWrapper = styled("div", {
	position: "relative",
	background: "$elevation2",
	transition: "height 300ms ease",
	variants: {
		fill: {
			true: {},
			false: {}
		},
		flat: {
			false: {},
			true: {}
		},
		isRoot: {
			true: {},
			false: {
				paddingLeft: "$md",
				"&::after": {
					content: "\"\"",
					position: "absolute",
					left: 0,
					top: 0,
					width: "$borderWidths$folder",
					height: "100%",
					backgroundColor: "$folderWidgetColor",
					opacity: .4,
					transform: "translateX(-50%)"
				}
			}
		}
	},
	compoundVariants: [{
		isRoot: true,
		fill: false,
		css: {
			overflowY: "auto",
			maxHeight: "calc(100vh - 20px - $$titleBarHeight)"
		}
	}, {
		isRoot: true,
		flat: false,
		css: { borderRadius: "$lg" }
	}]
});
var StyledTitle = styled("div", {
	$flex: "",
	color: "$folderTextColor",
	userSelect: "none",
	cursor: "pointer",
	height: "$folderTitleHeight",
	fontWeight: "$folder",
	"> svg": {
		marginLeft: -4,
		marginRight: 4,
		cursor: "pointer",
		fill: "$folderWidgetColor",
		opacity: .6
	},
	"&:hover > svg": { fill: "$folderWidgetColor" },
	[`&:hover + ${StyledWrapper}::after`]: { opacity: .6 },
	[`${StyledFolder}:hover > & + ${StyledWrapper}::after`]: { opacity: .6 },
	[`${StyledFolder}:hover > & > svg`]: { opacity: 1 }
});
var StyledContent = styled("div", {
	position: "relative",
	display: "grid",
	gridTemplateColumns: "100%",
	rowGap: "$rowGap",
	transition: "opacity 250ms ease",
	variants: {
		toggled: {
			true: {
				opacity: 1,
				transitionDelay: "250ms"
			},
			false: {
				opacity: 0,
				transitionDelay: "0ms",
				pointerEvents: "none"
			}
		},
		isRoot: { true: {
			"& > div": {
				paddingLeft: "$md",
				paddingRight: "$md"
			},
			"& > div:first-of-type": { paddingTop: "$sm" },
			"& > div:last-of-type": { paddingBottom: "$sm" },
			[`> ${StyledFolder}:not(:first-of-type)`]: {
				paddingTop: "$sm",
				marginTop: "$md",
				borderTop: "$borderWidths$folder solid $colors$elevation1"
			}
		} }
	}
});
var StyledRow = styled("div", {
	position: "relative",
	zIndex: 100,
	display: "grid",
	rowGap: "$rowGap",
	gridTemplateRows: "minmax($sizes$rowHeight, max-content)",
	alignItems: "center",
	color: "$highlight2",
	[`${StyledContent} > &`]: {
		"&:first-of-type": { marginTop: "$rowGap" },
		"&:last-of-type": { marginBottom: "$rowGap" }
	},
	variants: { disabled: {
		true: { pointerEvents: "none" },
		false: { "&:hover,&:focus-within": { color: "$highlight3" } }
	} }
});
var StyledInputRow = styled(StyledRow, {
	gridTemplateColumns: "auto $sizes$controlWidth",
	columnGap: "$colGap"
});
var CopyLabelContainer = styled("div", {
	$flex: "",
	height: "100%",
	position: "relative",
	overflow: "hidden",
	"& > div": {
		marginLeft: "$colGap",
		padding: "0 $xs",
		opacity: .4
	},
	"& > div:hover": { opacity: .8 },
	"& > div > svg": {
		display: "none",
		cursor: "pointer",
		width: 13,
		minWidth: 13,
		height: 13,
		backgroundColor: "$elevation2"
	},
	"&:hover > div > svg": { display: "block" },
	variants: { align: { top: {
		height: "100%",
		alignItems: "flex-start",
		paddingTop: "$sm"
	} } }
});
var StyledOptionalToggle = styled("input", {
	$reset: "",
	height: 0,
	width: 0,
	opacity: 0,
	margin: 0,
	"& + label": {
		position: "relative",
		$flexCenter: "",
		height: "100%",
		userSelect: "none",
		cursor: "pointer",
		paddingLeft: 2,
		paddingRight: "$sm",
		pointerEvents: "auto"
	},
	"& + label:after": {
		content: "\"\"",
		width: 6,
		height: 6,
		backgroundColor: "$elevation3",
		borderRadius: "50%",
		$activeStyle: ""
	},
	"&:focus + label:after": { $focusStyle: "" },
	"& + label:active:after": {
		backgroundColor: "$accent1",
		$focusStyle: ""
	},
	"&:checked + label:after": { backgroundColor: "$accent1" }
});
var StyledLabel = styled("label", {
	fontWeight: "$label",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
	"& > svg": { display: "block" }
});
var StyledInputWrapper$1 = styled("div", {
	opacity: 1,
	variants: { disabled: { true: {
		opacity: .6,
		pointerEvents: "none",
		[`& ${StyledLabel}`]: { pointerEvents: "auto" }
	} } }
});
var Overlay = styled("div", {
	position: "fixed",
	top: 0,
	bottom: 0,
	right: 0,
	left: 0,
	zIndex: 1e3,
	userSelect: "none"
});
var StyledToolTipContent = styled("div", {
	background: "$toolTipBackground",
	fontFamily: "$sans",
	fontSize: "$toolTip",
	padding: "$xs $sm",
	color: "$toolTipText",
	borderRadius: "$xs",
	boxShadow: "$level2",
	maxWidth: 260
});
var ToolTipArrow = styled(TooltipArrow, { fill: "$toolTipBackground" });
function Portal({ children, container = ((_globalThis$document) => globalThis === null || globalThis === void 0 || (_globalThis$document = globalThis.document) === null || _globalThis$document === void 0 ? void 0 : _globalThis$document.body)() }) {
	const { className } = (0, import_react.useContext)(ThemeContext);
	return import_react.createElement(Portal$1, {
		className,
		container
	}, children);
}
var _excluded$6$1 = ["align"];
function OptionalToggle() {
	const { id, disable, disabled } = useInputContext();
	return import_react.createElement(import_react.Fragment, null, import_react.createElement(StyledOptionalToggle, {
		id: id + "__disable",
		type: "checkbox",
		checked: !disabled,
		onChange: () => disable(!disabled)
	}), import_react.createElement("label", { htmlFor: id + "__disable" }));
}
function RawLabel(props) {
	const { id, optional, hint } = useInputContext();
	const htmlForProp = props.htmlFor || (id ? id : void 0);
	const titleProp = !hint && typeof props.children === "string" ? props.children : void 0;
	return import_react.createElement(import_react.Fragment, null, optional && import_react.createElement(OptionalToggle, null), hint !== void 0 ? import_react.createElement(Tooltip, null, import_react.createElement(TooltipTrigger, { asChild: true }, import_react.createElement(StyledLabel, _extends({ htmlFor: htmlForProp }, props))), import_react.createElement(TooltipContent, {
		side: "top",
		sideOffset: 2
	}, import_react.createElement(StyledToolTipContent, null, hint, import_react.createElement(ToolTipArrow, null)))) : import_react.createElement(StyledLabel, _extends({
		htmlFor: htmlForProp,
		title: titleProp
	}, props)));
}
function Label$1(_ref) {
	let { align } = _ref, props = _objectWithoutProperties$1(_ref, _excluded$6$1);
	const { value, label, key, disabled } = useInputContext();
	const { hideCopyButton } = usePanelSettingsContext();
	const copyEnabled = !hideCopyButton && key !== void 0;
	const [copied, setCopied] = (0, import_react.useState)(false);
	const handleClick = async () => {
		try {
			await navigator.clipboard.writeText(JSON.stringify({ [key]: value !== null && value !== void 0 ? value : "" }));
			setCopied(true);
		} catch (_unused) {
			warn(LevaErrors.CLIPBOARD_ERROR, { [key]: value });
		}
	};
	return import_react.createElement(CopyLabelContainer, {
		align,
		onPointerLeave: () => setCopied(false)
	}, import_react.createElement(RawLabel, props), copyEnabled && !disabled && import_react.createElement("div", { title: `Click to copy ${typeof label === "string" ? label : key} value` }, !copied ? import_react.createElement("svg", {
		onClick: handleClick,
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 20 20",
		fill: "currentColor"
	}, import_react.createElement("path", { d: "M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" }), import_react.createElement("path", { d: "M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" })) : import_react.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 20 20",
		fill: "currentColor"
	}, import_react.createElement("path", { d: "M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" }), import_react.createElement("path", {
		fillRule: "evenodd",
		d: "M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
		clipRule: "evenodd"
	}))));
}
var _excluded$5$1 = ["toggled"];
var Svg = styled("svg", {
	fill: "currentColor",
	transition: "transform 350ms ease, fill 250ms ease"
});
function Chevron(_ref) {
	let { toggled } = _ref, props = _objectWithoutProperties$1(_ref, _excluded$5$1);
	return import_react.createElement(Svg, _extends({
		width: "9",
		height: "5",
		viewBox: "0 0 9 5",
		xmlns: "http://www.w3.org/2000/svg",
		style: { transform: `rotate(${toggled ? 0 : -90}deg)` }
	}, props), import_react.createElement("path", { d: "M3.8 4.4c.4.3 1 .3 1.4 0L8 1.7A1 1 0 007.4 0H1.6a1 1 0 00-.7 1.7l3 2.7z" }));
}
var _excluded$4$1 = ["input"];
function Row(_ref) {
	let { input } = _ref, props = _objectWithoutProperties$1(_ref, _excluded$4$1);
	if (input) return import_react.createElement(StyledInputRow, props);
	return import_react.createElement(StyledRow, props);
}
function useInputSetters({ value, type, settings, setValue }) {
	const [displayValue, setDisplayValue] = (0, import_react.useState)(format$2(type, value, settings));
	const previousValueRef = (0, import_react.useRef)(value);
	const settingsRef = (0, import_react.useRef)(settings);
	settingsRef.current = settings;
	const setFormat = (0, import_react.useCallback)((v) => setDisplayValue(format$2(type, v, settingsRef.current)), [type]);
	const onUpdate = (0, import_react.useCallback)((updatedValue) => {
		try {
			setValue(updatedValue);
		} catch (error) {
			const { type, previousValue } = error;
			if (type !== "LEVA_ERROR") throw error;
			setFormat(previousValue);
		}
	}, [setFormat, setValue]);
	(0, import_react.useEffect)(() => {
		if (!dequal(value, previousValueRef.current)) setFormat(value);
		previousValueRef.current = value;
	}, [value, setFormat]);
	return {
		displayValue,
		onChange: setDisplayValue,
		onUpdate
	};
}
function useDrag(handler, config) {
	const { emitOnEditStart, emitOnEditEnd } = useInputContext();
	return useDrag$1((state) => {
		if (state.first) {
			document.body.classList.add("leva__panel__dragged");
			emitOnEditStart === null || emitOnEditStart === void 0 || emitOnEditStart();
		}
		const result = handler(state);
		if (state.last) {
			document.body.classList.remove("leva__panel__dragged");
			emitOnEditEnd === null || emitOnEditEnd === void 0 || emitOnEditEnd();
		}
		return result;
	}, config);
}
function useCanvas2d(fn) {
	const canvas = (0, import_react.useRef)(null);
	const ctx = (0, import_react.useRef)(null);
	const hasFired = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const handleCanvas = debounce(() => {
			canvas.current.width = canvas.current.offsetWidth * window.devicePixelRatio;
			canvas.current.height = canvas.current.offsetHeight * window.devicePixelRatio;
			fn(canvas.current, ctx.current);
		}, 250);
		window.addEventListener("resize", handleCanvas);
		if (!hasFired.current) {
			handleCanvas();
			hasFired.current = true;
		}
		return () => window.removeEventListener("resize", handleCanvas);
	}, [fn]);
	(0, import_react.useEffect)(() => {
		ctx.current = canvas.current.getContext("2d");
	}, []);
	return [canvas, ctx];
}
function useTransform() {
	const ref = (0, import_react.useRef)(null);
	const local = (0, import_react.useRef)({
		x: 0,
		y: 0
	});
	return [ref, (0, import_react.useCallback)((point) => {
		Object.assign(local.current, point);
		if (ref.current) ref.current.style.transform = `translate3d(${local.current.x}px, ${local.current.y}px, 0)`;
	}, [])];
}
var _excluded$3$1 = ["__refCount"];
var getInputAtPath = (data, path) => {
	if (!data[path]) return null;
	const _data$path = data[path];
	return _objectWithoutProperties$1(_data$path, _excluded$3$1);
};
function useInput(path) {
	const store = useStoreContext();
	const [state, setState] = (0, import_react.useState)(getInputAtPath(store.getData(), path));
	const set = (0, import_react.useCallback)((value) => store.setValueAtPath(path, value, true), [path, store]);
	const setSettings = (0, import_react.useCallback)((settings) => store.setSettingsAtPath(path, settings), [path, store]);
	const disable = (0, import_react.useCallback)((flag) => store.disableInputAtPath(path, flag), [path, store]);
	const emitOnEditStart = (0, import_react.useCallback)(() => store.emitOnEditStart(path), [path, store]);
	const emitOnEditEnd = (0, import_react.useCallback)(() => store.emitOnEditEnd(path), [path, store]);
	(0, import_react.useEffect)(() => {
		setState(getInputAtPath(store.getData(), path));
		const unsub = store.useStore.subscribe((s) => getInputAtPath(s.data, path), setState, { equalityFn: shallow });
		return () => unsub();
	}, [store, path]);
	return [state, {
		set,
		setSettings,
		disable,
		storeId: store.storeId,
		emitOnEditStart,
		emitOnEditEnd
	}];
}
var RangeGrid = styled("div", { variants: { hasRange: { true: {
	position: "relative",
	display: "grid",
	gridTemplateColumns: "auto $sizes$numberInputMinWidth",
	columnGap: "$colGap",
	alignItems: "center"
} } } });
var Range = styled("div", {
	position: "relative",
	width: "100%",
	height: 2,
	borderRadius: "$xs",
	backgroundColor: "$elevation1"
});
var Scrubber = styled("div", {
	position: "absolute",
	width: "$scrubberWidth",
	height: "$scrubberHeight",
	borderRadius: "$xs",
	boxShadow: "0 0 0 2px $colors$elevation2",
	backgroundColor: "$accent2",
	cursor: "pointer",
	$active: "none $accent1",
	$hover: "none $accent3",
	variants: { position: {
		left: {
			borderTopRightRadius: 0,
			borderBottomRightRadius: 0,
			transform: "translateX(calc(-0.5 * ($sizes$scrubberWidth + 4px)))"
		},
		right: {
			borderTopLeftRadius: 0,
			borderBottomLeftRadius: 0,
			transform: "translateX(calc(0.5 * ($sizes$scrubberWidth + 4px)))"
		}
	} }
});
var RangeWrapper = styled("div", {
	position: "relative",
	$flex: "",
	height: "100%",
	cursor: "pointer",
	touchAction: "none"
});
var Indicator = styled("div", {
	position: "absolute",
	height: "100%",
	backgroundColor: "$accent2"
});
function RangeSlider({ value, min, max, onDrag, step, initialValue }) {
	const ref = (0, import_react.useRef)(null);
	const scrubberRef = (0, import_react.useRef)(null);
	const rangeWidth = (0, import_react.useRef)(0);
	const scrubberWidth = useTh("sizes", "scrubberWidth");
	const bind = useDrag(({ event, first, xy: [x], movement: [mx], memo }) => {
		if (first) {
			const { width, left } = ref.current.getBoundingClientRect();
			rangeWidth.current = width - parseFloat(scrubberWidth);
			memo = (event === null || event === void 0 ? void 0 : event.target) === scrubberRef.current ? value : invertedRange((x - left) / width, min, max);
		}
		onDrag(sanitizeStep$1(memo + invertedRange(mx / rangeWidth.current, 0, max - min), {
			step,
			initialValue
		}));
		return memo;
	});
	const pos = range(value, min, max);
	return import_react.createElement(RangeWrapper, _extends({ ref }, bind()), import_react.createElement(Range, null, import_react.createElement(Indicator, { style: {
		left: 0,
		right: `${(1 - pos) * 100}%`
	} })), import_react.createElement(Scrubber, {
		ref: scrubberRef,
		style: { left: `calc(${pos} * (100% - ${scrubberWidth}))` }
	}));
}
var DraggableLabel = import_react.memo(({ label, onUpdate, step, innerLabelTrim }) => {
	const [dragging, setDragging] = (0, import_react.useState)(false);
	const bind = useDrag(({ active, delta: [dx], event, memo: _memo = 0, first, last, target }) => {
		if (first) target.requestPointerLock();
		if (last) document.exitPointerLock();
		setDragging(active);
		_memo += dx / 2;
		if (Math.abs(_memo) >= 1) {
			onUpdate((v) => parseFloat(v) + Math.floor(_memo) * step * multiplyStep(event));
			_memo = 0;
		}
		return _memo;
	});
	return import_react.createElement(InnerNumberLabel, _extends({
		dragging,
		title: label.length > 1 ? label : ""
	}, bind()), label.slice(0, innerLabelTrim));
});
function Number$1({ label, id, displayValue, onUpdate, onChange, settings, innerLabelTrim = 1 }) {
	const InnerLabel = innerLabelTrim > 0 && import_react.createElement(DraggableLabel, {
		label,
		step: settings.step,
		onUpdate,
		innerLabelTrim
	});
	return import_react.createElement(NumberInput, {
		id,
		value: String(displayValue),
		onUpdate,
		onChange,
		innerLabel: InnerLabel
	});
}
function NumberComponent() {
	const props = useInputContext();
	const { label, value, onUpdate, settings, id } = props;
	const { min, max } = settings;
	const hasRange = max !== Infinity && min !== -Infinity;
	return import_react.createElement(Row, { input: true }, import_react.createElement(Label$1, null, label), import_react.createElement(RangeGrid, { hasRange }, hasRange && import_react.createElement(RangeSlider, _extends({
		value: parseFloat(value),
		onDrag: onUpdate
	}, settings)), import_react.createElement(Number$1, _extends({}, props, {
		id,
		label: "value",
		innerLabelTrim: hasRange ? 0 : 1
	}))));
}
var { sanitizeStep } = props$3, rest = _objectWithoutProperties$1(props$3, ["sanitizeStep"]);
var number$1 = createInternalPlugin(_objectSpread2({ component: NumberComponent }, rest));
var schema$2$1 = (_o, s) => v8n().schema({ options: v8n().passesAnyOf(v8n().object(), v8n().array()) }).test(s);
var sanitize$2$1 = (value, { values }) => {
	if (values.indexOf(value) < 0) throw Error(`Selected value doesn't match Select options`);
	return value;
};
var format$3 = (value, { values }) => {
	return values.indexOf(value);
};
var normalize$1$1 = (input) => {
	let { value, options } = input;
	let keys;
	let values;
	if (Array.isArray(options)) {
		values = options;
		keys = options.map((o) => String(o));
	} else {
		values = Object.values(options);
		keys = Object.keys(options);
	}
	if (!("value" in input)) value = values[0];
	else if (!values.includes(value)) {
		keys.unshift(String(value));
		values.unshift(value);
	}
	if (!Object.values(options).includes(value)) options[String(value)] = value;
	return {
		value,
		settings: {
			keys,
			values
		}
	};
};
var props$2$1 = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	schema: schema$2$1,
	sanitize: sanitize$2$1,
	format: format$3,
	normalize: normalize$1$1
});
var SelectContainer = styled("div", {
	$flexCenter: "",
	position: "relative",
	"> svg": {
		pointerEvents: "none",
		position: "absolute",
		right: "$md"
	}
});
var NativeSelect = styled("select", {
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	opacity: 0
});
var PresentationalSelect = styled("div", {
	display: "flex",
	alignItems: "center",
	width: "100%",
	height: "$rowHeight",
	backgroundColor: "$elevation3",
	borderRadius: "$sm",
	padding: "0 $sm",
	cursor: "pointer",
	[`${NativeSelect}:focus + &`]: { $focusStyle: "" },
	[`${NativeSelect}:hover + &`]: { $hoverStyle: "" }
});
function Select({ displayValue, value, onUpdate, id, settings, disabled }) {
	const { keys, values } = settings;
	const lastDisplayedValue = (0, import_react.useRef)();
	if (value === values[displayValue]) lastDisplayedValue.current = keys[displayValue];
	return import_react.createElement(SelectContainer, null, import_react.createElement(NativeSelect, {
		id,
		value: displayValue,
		onChange: (e) => onUpdate(values[Number(e.currentTarget.value)]),
		disabled
	}, keys.map((key, index) => import_react.createElement("option", {
		key,
		value: index
	}, key))), import_react.createElement(PresentationalSelect, null, lastDisplayedValue.current), import_react.createElement(Chevron, { toggled: true }));
}
function SelectComponent() {
	const { label, value, displayValue, onUpdate, id, disabled, settings } = useInputContext();
	return import_react.createElement(Row, { input: true }, import_react.createElement(Label$1, null, label), import_react.createElement(Select, {
		id,
		value,
		displayValue,
		onUpdate,
		settings,
		disabled
	}));
}
var select = createInternalPlugin(_objectSpread2({ component: SelectComponent }, props$2$1));
var schema$1$1 = (o) => v8n().string().test(o);
var sanitize$1$1 = (v) => {
	if (typeof v !== "string") throw Error(`Invalid string`);
	return v;
};
var normalize$4 = ({ value, editable: _editable = true, rows: _rows = false }) => {
	return {
		value,
		settings: {
			editable: _editable,
			rows: typeof _rows === "number" ? _rows : _rows ? 5 : 0
		}
	};
};
var props$1$1 = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	schema: schema$1$1,
	sanitize: sanitize$1$1,
	normalize: normalize$4
});
var _excluded$2 = [
	"displayValue",
	"onUpdate",
	"onChange",
	"editable"
];
var NonEditableString = styled("div", { whiteSpace: "pre-wrap" });
function String$1(_ref) {
	let { displayValue, onUpdate, onChange, editable = true } = _ref, props = _objectWithoutProperties$1(_ref, _excluded$2);
	if (editable) return import_react.createElement(ValueInput, _extends({
		value: displayValue,
		onUpdate,
		onChange
	}, props));
	return import_react.createElement(NonEditableString, null, displayValue);
}
function StringComponent() {
	const { label, settings, displayValue, onUpdate, onChange } = useInputContext();
	return import_react.createElement(Row, { input: true }, import_react.createElement(Label$1, null, label), import_react.createElement(String$1, _extends({
		displayValue,
		onUpdate,
		onChange
	}, settings)));
}
var string = createInternalPlugin(_objectSpread2({ component: StringComponent }, props$1$1));
var schema$4 = (o) => v8n().boolean().test(o);
var sanitize$5 = (v) => {
	if (typeof v !== "boolean") throw Error("Invalid boolean");
	return v;
};
var props$4 = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	schema: schema$4,
	sanitize: sanitize$5
});
var StyledInputWrapper = styled("div", {
	position: "relative",
	$flex: "",
	height: "$rowHeight",
	input: {
		$reset: "",
		height: 0,
		width: 0,
		opacity: 0,
		margin: 0
	},
	label: {
		position: "relative",
		$flexCenter: "",
		userSelect: "none",
		cursor: "pointer",
		height: "$checkboxSize",
		width: "$checkboxSize",
		backgroundColor: "$elevation3",
		borderRadius: "$sm",
		$hover: ""
	},
	"input:focus + label": { $focusStyle: "" },
	"input:focus:checked + label, input:checked + label:hover": { $hoverStyle: "$accent3" },
	"input + label:active": { backgroundColor: "$accent1" },
	"input:checked + label:active": { backgroundColor: "$accent1" },
	"label > svg": {
		display: "none",
		width: "90%",
		height: "90%",
		stroke: "$highlight3"
	},
	"input:checked + label": { backgroundColor: "$accent2" },
	"input:checked + label > svg": { display: "block" }
});
function Boolean$1({ value, onUpdate, id, disabled }) {
	return import_react.createElement(StyledInputWrapper, null, import_react.createElement("input", {
		id,
		type: "checkbox",
		checked: value,
		onChange: (e) => onUpdate(e.currentTarget.checked),
		disabled
	}), import_react.createElement("label", { htmlFor: id }, import_react.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		fill: "none",
		viewBox: "0 0 24 24"
	}, import_react.createElement("path", {
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 2,
		d: "M5 13l4 4L19 7"
	}))));
}
function BooleanComponent() {
	const { label, value, onUpdate, disabled, id } = useInputContext();
	return import_react.createElement(Row, { input: true }, import_react.createElement(Label$1, null, label), import_react.createElement(Boolean$1, {
		value,
		onUpdate,
		id,
		disabled
	}));
}
var boolean = createInternalPlugin(_objectSpread2({ component: BooleanComponent }, props$4));
var _excluded$1 = ["locked"];
function Coordinate({ value, id, valueKey, settings, onUpdate, innerLabelTrim }) {
	const valueRef = (0, import_react.useRef)(value[valueKey]);
	valueRef.current = value[valueKey];
	const setValue = (0, import_react.useCallback)((newValue) => onUpdate({ [valueKey]: sanitizeValue({
		type: "NUMBER",
		value: valueRef.current,
		settings
	}, newValue) }), [
		onUpdate,
		settings,
		valueKey
	]);
	const number = useInputSetters({
		type: "NUMBER",
		value: value[valueKey],
		settings,
		setValue
	});
	return import_react.createElement(Number$1, {
		id,
		label: valueKey,
		value: value[valueKey],
		displayValue: number.displayValue,
		onUpdate: number.onUpdate,
		onChange: number.onChange,
		settings,
		innerLabelTrim
	});
}
var Container$2 = styled("div", {
	display: "grid",
	columnGap: "$colGap",
	gridAutoFlow: "column dense",
	alignItems: "center",
	variants: { withLock: { true: {
		gridTemplateColumns: "10px auto",
		"> svg": { cursor: "pointer" }
	} } }
});
function Lock(_ref) {
	let { locked } = _ref, props = _objectWithoutProperties$1(_ref, _excluded$1);
	return import_react.createElement("svg", _extends({
		width: "10",
		height: "10",
		viewBox: "0 0 15 15",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg"
	}, props), locked ? import_react.createElement("path", {
		d: "M5 4.63601C5 3.76031 5.24219 3.1054 5.64323 2.67357C6.03934 2.24705 6.64582 1.9783 7.5014 1.9783C8.35745 1.9783 8.96306 2.24652 9.35823 2.67208C9.75838 3.10299 10 3.75708 10 4.63325V5.99999H5V4.63601ZM4 5.99999V4.63601C4 3.58148 4.29339 2.65754 4.91049 1.99307C5.53252 1.32329 6.42675 0.978302 7.5014 0.978302C8.57583 0.978302 9.46952 1.32233 10.091 1.99162C10.7076 2.65557 11 3.57896 11 4.63325V5.99999H12C12.5523 5.99999 13 6.44771 13 6.99999V13C13 13.5523 12.5523 14 12 14H3C2.44772 14 2 13.5523 2 13V6.99999C2 6.44771 2.44772 5.99999 3 5.99999H4ZM3 6.99999H12V13H3V6.99999Z",
		fill: "currentColor",
		fillRule: "evenodd",
		clipRule: "evenodd"
	}) : import_react.createElement("path", {
		d: "M9 3.63601C9 2.76044 9.24207 2.11211 9.64154 1.68623C10.0366 1.26502 10.6432 1 11.5014 1C12.4485 1 13.0839 1.30552 13.4722 1.80636C13.8031 2.23312 14 2.84313 14 3.63325H15C15 2.68242 14.7626 1.83856 14.2625 1.19361C13.6389 0.38943 12.6743 0 11.5014 0C10.4294 0 9.53523 0.337871 8.91218 1.0021C8.29351 1.66167 8 2.58135 8 3.63601V6H1C0.447715 6 0 6.44772 0 7V13C0 13.5523 0.447715 14 1 14H10C10.5523 14 11 13.5523 11 13V7C11 6.44772 10.5523 6 10 6H9V3.63601ZM1 7H10V13H1V7Z",
		fill: "currentColor",
		fillRule: "evenodd",
		clipRule: "evenodd"
	}));
}
function Vector({ value, onUpdate, settings, innerLabelTrim }) {
	const { id, setSettings } = useInputContext();
	const { lock, locked } = settings;
	return import_react.createElement(Container$2, { withLock: lock }, lock && import_react.createElement(Lock, {
		locked,
		onClick: () => setSettings({ locked: !locked })
	}), Object.keys(value).map((key, i) => import_react.createElement(Coordinate, {
		id: i === 0 ? id : `${id}.${key}`,
		key,
		valueKey: key,
		value,
		settings: settings[key],
		onUpdate,
		innerLabelTrim
	})));
}
var normalizeKeyedNumberSettings = (value, settings) => {
	const _settings = {};
	let maxStep = 0;
	let minPad = Infinity;
	Object.entries(value).forEach(([key, v]) => {
		_settings[key] = normalize$2$1(_objectSpread2({ value: v }, settings[key])).settings;
		maxStep = Math.max(maxStep, _settings[key].step);
		minPad = Math.min(minPad, _settings[key].pad);
	});
	for (let key in _settings) {
		const { step, min, max } = settings[key] || {};
		if (!isFinite(step) && (!isFinite(min) || !isFinite(max))) {
			_settings[key].step = maxStep;
			_settings[key].pad = minPad;
		}
	}
	return _settings;
};
var _excluded$10 = ["lock"];
var _excluded2$5 = ["value"];
function getVectorSchema(dimension) {
	const isVectorArray = v8n().array().length(dimension).every.number();
	const isVectorObject = (o) => {
		if (!o || typeof o !== "object") return false;
		const values = Object.values(o);
		return values.length === dimension && values.every((v) => isFinite(v));
	};
	return (o) => {
		return isVectorArray.test(o) || isVectorObject(o);
	};
}
function getVectorType(value) {
	return Array.isArray(value) ? "array" : "object";
}
function convert$1(value, format, keys) {
	if (getVectorType(value) === format) return value;
	return format === "array" ? Object.values(value) : mapArrayToKeys(value, keys);
}
var sanitizeVector = (value, settings, previousValue) => {
	const _value = convert$1(value, "object", settings.keys);
	for (let key in _value) _value[key] = sanitize$3(_value[key], settings[key]);
	const _valueKeys = Object.keys(_value);
	let newValue = {};
	if (_valueKeys.length === settings.keys.length) newValue = _value;
	else {
		const _previousValue = convert$1(previousValue, "object", settings.keys);
		if (_valueKeys.length === 1 && settings.locked) {
			const lockedKey = _valueKeys[0];
			const lockedCoordinate = _value[lockedKey];
			const previousLockedCoordinate = _previousValue[lockedKey];
			const ratio = previousLockedCoordinate !== 0 ? lockedCoordinate / previousLockedCoordinate : 1;
			for (let key in _previousValue) if (key === lockedKey) newValue[lockedKey] = lockedCoordinate;
			else newValue[key] = _previousValue[key] * ratio;
		} else newValue = _objectSpread2(_objectSpread2({}, _previousValue), _value);
	}
	return convert$1(newValue, settings.format, settings.keys);
};
var formatVector = (value, settings) => convert$1(value, "object", settings.keys);
var isNumberSettings = (o) => !!o && ("step" in o || "min" in o || "max" in o);
function normalizeVector(value, settings, defaultKeys = []) {
	const { lock = false } = settings, _settings = _objectWithoutProperties$1(settings, _excluded$10);
	const format = Array.isArray(value) ? "array" : "object";
	const keys = format === "object" ? Object.keys(value) : defaultKeys;
	const _value = convert$1(value, "object", keys);
	const numberSettings = normalizeKeyedNumberSettings(_value, isNumberSettings(_settings) ? keys.reduce((acc, k) => Object.assign(acc, { [k]: _settings }), {}) : _settings);
	return {
		value: format === "array" ? value : _value,
		settings: _objectSpread2(_objectSpread2({}, numberSettings), {}, {
			format,
			keys,
			lock,
			locked: false
		})
	};
}
function getVectorPlugin(defaultKeys) {
	return {
		schema: getVectorSchema(defaultKeys.length),
		normalize: (_ref) => {
			let { value } = _ref;
			return normalizeVector(value, _objectWithoutProperties$1(_ref, _excluded2$5), defaultKeys);
		},
		format: (value, settings) => formatVector(value, settings),
		sanitize: (value, settings, prevValue) => sanitizeVector(value, settings, prevValue)
	};
}
//#endregion
//#region node_modules/colord/index.mjs
for (var r$1 = {
	grad: .9,
	turn: 360,
	rad: 360 / (2 * Math.PI)
}, t$1 = function(r) {
	return "string" == typeof r ? r.length > 0 : "number" == typeof r;
}, n$1 = function(r, t, n) {
	return void 0 === t && (t = 0), void 0 === n && (n = Math.pow(10, t)), Math.round(n * r) / n + 0;
}, u$1 = function(r, t, n) {
	return void 0 === t && (t = 0), void 0 === n && (n = 1), r > n ? n : r > t ? r : t;
}, e$2 = function(r) {
	return (r = isFinite(r) ? r % 360 : 0) < 0 ? r + 360 : r;
}, o$1 = function(r, t) {
	return void 0 === t && (t = 0), n$1(r, t) % 360;
}, a$1 = function(r) {
	return {
		r: u$1(r.r, 0, 255),
		g: u$1(r.g, 0, 255),
		b: u$1(r.b, 0, 255),
		a: u$1(r.a)
	};
}, i$1 = function(r) {
	return {
		r: n$1(r.r),
		g: n$1(r.g),
		b: n$1(r.b),
		a: n$1(r.a, 3)
	};
}, s$1 = /^#([0-9a-f]{3,8})$/i, d$1 = function(r, t) {
	var n = r.charCodeAt(t);
	return (15 & n) + 9 * (n >> 6);
}, h$1 = function(r, t) {
	return d$1(r, t) << 4 | d$1(r, t + 1);
}, b$1 = [], f$1 = 0; f$1 < 256; f$1++) b$1.push((f$1 < 16 ? "0" : "") + f$1.toString(16));
var g$1 = function(r) {
	return b$1[u$1(r, 0, 255)];
};
var c$1 = function(r) {
	var t = r.r, n = r.g, u = r.b, e = r.a, o = Math.max(t, n, u), a = o - Math.min(t, n, u), i = a ? o === t ? (n - u) / a : o === n ? 2 + (u - t) / a : 4 + (t - n) / a : 0;
	return {
		h: 60 * (i < 0 ? i + 6 : i),
		s: o ? a / o * 100 : 0,
		v: o / 255 * 100,
		a: e
	};
};
var v$1 = function(r) {
	var t = r.h, n = r.s, u = r.v, e = r.a;
	t = t / 360 * 6, n /= 100, u /= 100;
	var o = Math.floor(t), a = u * (1 - n), i = u * (1 - (t - o) * n), s = u * (1 - (1 - t + o) * n), d = o % 6;
	return {
		r: 255 * [
			u,
			i,
			a,
			a,
			s,
			u
		][d],
		g: 255 * [
			s,
			u,
			u,
			i,
			a,
			a
		][d],
		b: 255 * [
			a,
			a,
			s,
			u,
			u,
			i
		][d],
		a: e
	};
};
var l$1 = function(r) {
	return {
		h: e$2(r.h),
		s: u$1(r.s, 0, 100),
		l: u$1(r.l, 0, 100),
		a: u$1(r.a)
	};
};
var p$1 = function(r) {
	return {
		h: o$1(r.h),
		s: n$1(r.s),
		l: n$1(r.l),
		a: n$1(r.a, 3)
	};
};
var m$1 = function(r) {
	return v$1((n = (t = r).s, {
		h: t.h,
		s: (n *= ((u = t.l) < 50 ? u : 100 - u) / 100) > 0 ? 2 * n / (u + n) * 100 : 0,
		v: u + n,
		a: t.a
	}));
	var t, n, u;
};
var y$1 = function(r) {
	return {
		h: (t = c$1(r)).h,
		s: (e = (200 - (n = t.s)) * (u = t.v) / 100) > 0 && e < 200 ? n * u / 100 / (e <= 100 ? e : 200 - e) * 100 : 0,
		l: e / 2,
		a: t.a
	};
	var t, n, u, e;
};
var N = /^hsla?\(\s*([+-]?(?:\d*\.\d+|\d+))(deg|rad|grad|turn)?\s*,\s*([+-]?(?:\d*\.\d+|\d+))%\s*,\s*([+-]?(?:\d*\.\d+|\d+))%\s*(?:,\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s*)?\)$/i;
var x = /^hsla?\(\s*([+-]?(?:\d*\.\d+|\d+))(deg|rad|grad|turn)?\s+([+-]?(?:\d*\.\d+|\d+))%\s+([+-]?(?:\d*\.\d+|\d+))%\s*(?:\/\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s*)?\)$/i;
var M = /^rgba?\(\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s*,\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s*,\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s*(?:,\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s*)?\)$/i;
var H = /^rgba?\(\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s+([+-]?(?:\d*\.\d+|\d+))(%)?\s+([+-]?(?:\d*\.\d+|\d+))(%)?\s*(?:\/\s*([+-]?(?:\d*\.\d+|\d+))(%)?\s*)?\)$/i;
var $$1 = {
	string: [
		[function(r) {
			if (!s$1.test(r)) return null;
			var t = r.length;
			return t <= 5 ? {
				r: 17 * d$1(r, 1),
				g: 17 * d$1(r, 2),
				b: 17 * d$1(r, 3),
				a: 5 === t ? n$1(17 * d$1(r, 4) / 255, 2) : 1
			} : 7 === t || 9 === t ? {
				r: h$1(r, 1),
				g: h$1(r, 3),
				b: h$1(r, 5),
				a: 9 === t ? n$1(h$1(r, 7) / 255, 2) : 1
			} : null;
		}, "hex"],
		[function(r) {
			var t = M.exec(r) || H.exec(r);
			return t ? t[2] !== t[4] || t[4] !== t[6] ? null : a$1({
				r: Number(t[1]) / (t[2] ? 100 / 255 : 1),
				g: Number(t[3]) / (t[4] ? 100 / 255 : 1),
				b: Number(t[5]) / (t[6] ? 100 / 255 : 1),
				a: void 0 === t[7] ? 1 : Number(t[7]) / (t[8] ? 100 : 1)
			}) : null;
		}, "rgb"],
		[function(t) {
			var n = N.exec(t) || x.exec(t);
			if (!n) return null;
			var u, e;
			return m$1(l$1({
				h: (u = n[1], e = n[2], void 0 === e && (e = "deg"), Number(u) * (r$1[e] || 1)),
				s: Number(n[3]),
				l: Number(n[4]),
				a: void 0 === n[5] ? 1 : Number(n[5]) / (n[6] ? 100 : 1)
			}));
		}, "hsl"]
	],
	object: [
		[function(r) {
			var n = r.r, u = r.g, e = r.b, o = r.a, i = void 0 === o ? 1 : o;
			return t$1(n) && t$1(u) && t$1(e) ? a$1({
				r: Number(n),
				g: Number(u),
				b: Number(e),
				a: Number(i)
			}) : null;
		}, "rgb"],
		[function(r) {
			var n = r.h, u = r.s, e = r.l, o = r.a, a = void 0 === o ? 1 : o;
			if (!t$1(n) || !t$1(u) || !t$1(e)) return null;
			return m$1(l$1({
				h: Number(n),
				s: Number(u),
				l: Number(e),
				a: Number(a)
			}));
		}, "hsl"],
		[function(r) {
			var n = r.h, o = r.s, a = r.v, i = r.a, s = void 0 === i ? 1 : i;
			if (!t$1(n) || !t$1(o) || !t$1(a)) return null;
			return v$1(function(r) {
				return {
					h: e$2(r.h),
					s: u$1(r.s, 0, 100),
					v: u$1(r.v, 0, 100),
					a: u$1(r.a)
				};
			}({
				h: Number(n),
				s: Number(o),
				v: Number(a),
				a: Number(s)
			}));
		}, "hsv"]
	]
};
var j = function(r, t) {
	for (var n = 0; n < t.length; n++) {
		var u = t[n][0](r);
		if (u) return [u, t[n][1]];
	}
	return [null, void 0];
};
var w = function(r) {
	return "string" == typeof r ? j(r.trim(), $$1.string) : "object" == typeof r && null !== r ? j(r, $$1.object) : [null, void 0];
};
var S$1 = function(r) {
	return w(r)[1];
};
var k$1 = function(r, t) {
	var n = y$1(r);
	return {
		h: n.h,
		s: u$1(n.s + 100 * t, 0, 100),
		l: n.l,
		a: n.a
	};
};
var E = function(r) {
	return (299 * r.r + 587 * r.g + 114 * r.b) / 1e3 / 255;
};
var R$1 = function(r, t) {
	var n = y$1(r);
	return {
		h: n.h,
		s: n.s,
		l: u$1(n.l + 100 * t, 0, 100),
		a: n.a
	};
};
var q$1 = function() {
	function r(r) {
		this.parsed = w(r)[0], this.rgba = this.parsed || {
			r: 0,
			g: 0,
			b: 0,
			a: 1
		};
	}
	return r.prototype.isValid = function() {
		return null !== this.parsed;
	}, r.prototype.brightness = function() {
		return n$1(E(this.rgba), 2);
	}, r.prototype.isDark = function() {
		return E(this.rgba) < .5;
	}, r.prototype.isLight = function() {
		return E(this.rgba) >= .5;
	}, r.prototype.toHex = function() {
		return r = i$1(this.rgba), t = r.r, u = r.g, e = r.b, a = (o = r.a) < 1 ? g$1(n$1(255 * o)) : "", "#" + g$1(t) + g$1(u) + g$1(e) + a;
		var r, t, u, e, o, a;
	}, r.prototype.toRgb = function() {
		return i$1(this.rgba);
	}, r.prototype.toRgbString = function() {
		return r = i$1(this.rgba), t = r.r, n = r.g, u = r.b, (e = r.a) < 1 ? "rgba(" + t + ", " + n + ", " + u + ", " + e + ")" : "rgb(" + t + ", " + n + ", " + u + ")";
		var r, t, n, u, e;
	}, r.prototype.toHsl = function() {
		return p$1(y$1(this.rgba));
	}, r.prototype.toHslString = function() {
		return r = p$1(y$1(this.rgba)), t = r.h, n = r.s, u = r.l, (e = r.a) < 1 ? "hsla(" + t + ", " + n + "%, " + u + "%, " + e + ")" : "hsl(" + t + ", " + n + "%, " + u + "%)";
		var r, t, n, u, e;
	}, r.prototype.toHsv = function() {
		return r = c$1(this.rgba), {
			h: o$1(r.h),
			s: n$1(r.s),
			v: n$1(r.v),
			a: n$1(r.a, 3)
		};
		var r;
	}, r.prototype.invert = function() {
		return A({
			r: 255 - (r = this.rgba).r,
			g: 255 - r.g,
			b: 255 - r.b,
			a: r.a
		});
		var r;
	}, r.prototype.saturate = function(r) {
		return void 0 === r && (r = .1), A(k$1(this.rgba, r));
	}, r.prototype.desaturate = function(r) {
		return void 0 === r && (r = .1), A(k$1(this.rgba, -r));
	}, r.prototype.grayscale = function() {
		return A(k$1(this.rgba, -1));
	}, r.prototype.lighten = function(r) {
		return void 0 === r && (r = .1), A(R$1(this.rgba, r));
	}, r.prototype.darken = function(r) {
		return void 0 === r && (r = .1), A(R$1(this.rgba, -r));
	}, r.prototype.rotate = function(r) {
		return void 0 === r && (r = 15), this.hue(y$1(this.rgba).h + r);
	}, r.prototype.alpha = function(r) {
		return "number" == typeof r ? A({
			r: (t = this.rgba).r,
			g: t.g,
			b: t.b,
			a: r
		}) : n$1(this.rgba.a, 3);
		var t;
	}, r.prototype.hue = function(r) {
		var t = y$1(this.rgba);
		return "number" == typeof r ? A({
			h: r,
			s: t.s,
			l: t.l,
			a: t.a
		}) : o$1(t.h);
	}, r.prototype.isEqual = function(r) {
		return this.toHex() === A(r).toHex();
	}, r;
}();
var A = function(r) {
	return r instanceof q$1 ? r : new q$1(r);
};
var C = [];
var D = function(r) {
	r.forEach(function(r) {
		C.indexOf(r) < 0 && (r(q$1, $$1), C.push(r));
	});
};
//#endregion
//#region node_modules/colord/plugins/names.mjs
var e$1 = function(e, f) {
	var a = {
		white: "#ffffff",
		bisque: "#ffe4c4",
		blue: "#0000ff",
		cadetblue: "#5f9ea0",
		chartreuse: "#7fff00",
		chocolate: "#d2691e",
		coral: "#ff7f50",
		antiquewhite: "#faebd7",
		aqua: "#00ffff",
		azure: "#f0ffff",
		whitesmoke: "#f5f5f5",
		papayawhip: "#ffefd5",
		plum: "#dda0dd",
		blanchedalmond: "#ffebcd",
		black: "#000000",
		gold: "#ffd700",
		goldenrod: "#daa520",
		gainsboro: "#dcdcdc",
		cornsilk: "#fff8dc",
		cornflowerblue: "#6495ed",
		burlywood: "#deb887",
		aquamarine: "#7fffd4",
		beige: "#f5f5dc",
		crimson: "#dc143c",
		cyan: "#00ffff",
		darkblue: "#00008b",
		darkcyan: "#008b8b",
		darkgoldenrod: "#b8860b",
		darkkhaki: "#bdb76b",
		darkgray: "#a9a9a9",
		darkgreen: "#006400",
		darkgrey: "#a9a9a9",
		peachpuff: "#ffdab9",
		darkmagenta: "#8b008b",
		darkred: "#8b0000",
		darkorchid: "#9932cc",
		darkorange: "#ff8c00",
		darkslateblue: "#483d8b",
		gray: "#808080",
		darkslategray: "#2f4f4f",
		darkslategrey: "#2f4f4f",
		deeppink: "#ff1493",
		deepskyblue: "#00bfff",
		wheat: "#f5deb3",
		firebrick: "#b22222",
		floralwhite: "#fffaf0",
		ghostwhite: "#f8f8ff",
		darkviolet: "#9400d3",
		magenta: "#ff00ff",
		green: "#008000",
		dodgerblue: "#1e90ff",
		grey: "#808080",
		honeydew: "#f0fff0",
		hotpink: "#ff69b4",
		blueviolet: "#8a2be2",
		forestgreen: "#228b22",
		lawngreen: "#7cfc00",
		indianred: "#cd5c5c",
		indigo: "#4b0082",
		fuchsia: "#ff00ff",
		brown: "#a52a2a",
		maroon: "#800000",
		mediumblue: "#0000cd",
		lightcoral: "#f08080",
		darkturquoise: "#00ced1",
		lightcyan: "#e0ffff",
		ivory: "#fffff0",
		lightyellow: "#ffffe0",
		lightsalmon: "#ffa07a",
		lightseagreen: "#20b2aa",
		linen: "#faf0e6",
		mediumaquamarine: "#66cdaa",
		lemonchiffon: "#fffacd",
		lime: "#00ff00",
		khaki: "#f0e68c",
		mediumseagreen: "#3cb371",
		limegreen: "#32cd32",
		mediumspringgreen: "#00fa9a",
		lightskyblue: "#87cefa",
		lightblue: "#add8e6",
		midnightblue: "#191970",
		lightpink: "#ffb6c1",
		mistyrose: "#ffe4e1",
		moccasin: "#ffe4b5",
		mintcream: "#f5fffa",
		lightslategray: "#778899",
		lightslategrey: "#778899",
		navajowhite: "#ffdead",
		navy: "#000080",
		mediumvioletred: "#c71585",
		powderblue: "#b0e0e6",
		palegoldenrod: "#eee8aa",
		oldlace: "#fdf5e6",
		paleturquoise: "#afeeee",
		mediumturquoise: "#48d1cc",
		mediumorchid: "#ba55d3",
		rebeccapurple: "#663399",
		lightsteelblue: "#b0c4de",
		mediumslateblue: "#7b68ee",
		thistle: "#d8bfd8",
		tan: "#d2b48c",
		orchid: "#da70d6",
		mediumpurple: "#9370db",
		purple: "#800080",
		pink: "#ffc0cb",
		skyblue: "#87ceeb",
		springgreen: "#00ff7f",
		palegreen: "#98fb98",
		red: "#ff0000",
		yellow: "#ffff00",
		slateblue: "#6a5acd",
		lavenderblush: "#fff0f5",
		peru: "#cd853f",
		palevioletred: "#db7093",
		violet: "#ee82ee",
		teal: "#008080",
		slategray: "#708090",
		slategrey: "#708090",
		aliceblue: "#f0f8ff",
		darkseagreen: "#8fbc8f",
		darkolivegreen: "#556b2f",
		greenyellow: "#adff2f",
		seagreen: "#2e8b57",
		seashell: "#fff5ee",
		tomato: "#ff6347",
		silver: "#c0c0c0",
		sienna: "#a0522d",
		lavender: "#e6e6fa",
		lightgreen: "#90ee90",
		orange: "#ffa500",
		orangered: "#ff4500",
		steelblue: "#4682b4",
		royalblue: "#4169e1",
		turquoise: "#40e0d0",
		yellowgreen: "#9acd32",
		salmon: "#fa8072",
		saddlebrown: "#8b4513",
		sandybrown: "#f4a460",
		rosybrown: "#bc8f8f",
		darksalmon: "#e9967a",
		lightgoldenrodyellow: "#fafad2",
		snow: "#fffafa",
		lightgrey: "#d3d3d3",
		lightgray: "#d3d3d3",
		dimgray: "#696969",
		dimgrey: "#696969",
		olivedrab: "#6b8e23",
		olive: "#808000"
	}, r = {};
	for (var d in a) r[a[d]] = d;
	var l = {};
	e.prototype.toName = function(f) {
		if (!(this.rgba.a || this.rgba.r || this.rgba.g || this.rgba.b)) return "transparent";
		var d, i, n = r[this.toHex()];
		if (n) return n;
		if (null == f ? void 0 : f.closest) {
			var o = this.toRgb(), t = 1 / 0, b = "black";
			if (!l.length) for (var c in a) l[c] = new e(a[c]).toRgb();
			for (var g in a) {
				var u = (d = o, i = l[g], Math.pow(d.r - i.r, 2) + Math.pow(d.g - i.g, 2) + Math.pow(d.b - i.b, 2));
				u < t && (t = u, b = g);
			}
			return b;
		}
	};
	f.string.push([function(f) {
		var r = f.toLowerCase(), d = "transparent" === r ? "#0000" : a[r];
		return d ? new e(d).toRgb() : null;
	}, "name"]);
};
//#endregion
//#region node_modules/react-colorful/dist/index.mjs
function l() {
	return (l = Object.assign || function(e) {
		for (var r = 1; r < arguments.length; r++) {
			var n = arguments[r];
			for (var t in n) Object.prototype.hasOwnProperty.call(n, t) && (e[t] = n[t]);
		}
		return e;
	}).apply(this, arguments);
}
function c(e, r) {
	if (null == e) return {};
	var n, t, o = {}, a = Object.keys(e);
	for (t = 0; t < a.length; t++) r.indexOf(n = a[t]) >= 0 || (o[n] = e[n]);
	return o;
}
function i(e) {
	var n = (0, import_react.useRef)(e), t = (0, import_react.useRef)(function(e) {
		n.current && n.current(e);
	});
	return n.current = e, t.current;
}
var s = function(e, r, n) {
	return void 0 === r && (r = 0), void 0 === n && (n = 1), e > n ? n : e < r ? r : e;
};
var f = function(e) {
	return "touches" in e;
};
var d = function(e) {
	return e && e.ownerDocument.defaultView || self;
};
var v = function(e, r, n) {
	var t = e.getBoundingClientRect(), o = f(r) ? function(e, r) {
		for (var n = 0; n < e.length; n++) if (e[n].identifier === r) return e[n];
		return e[0];
	}(r.touches, n) : r;
	return {
		left: s((o.pageX - (t.left + d(e).pageXOffset)) / t.width),
		top: s((o.pageY - (t.top + d(e).pageYOffset)) / t.height)
	};
};
var h = function(e) {
	!f(e) && e.preventDefault();
};
var g = import_react.memo(function(o) {
	var a = o.onMove, u = o.onKey, s = o.onEnd, g = c(o, [
		"onMove",
		"onKey",
		"onEnd"
	]), m = (0, import_react.useRef)(null), p = i(a), b = i(u), _ = i(s), E = (0, import_react.useRef)(null), C = (0, import_react.useRef)(!1), x = (0, import_react.useMemo)(function() {
		var e = function(e) {
			h(e), (f(e) ? e.touches.length > 0 : e.buttons > 0) && m.current ? p(v(m.current, e, E.current)) : (n(!1), _());
		}, r = function() {
			n(!1), _();
		};
		function n(n) {
			var t = C.current, o = d(m.current), a = n ? o.addEventListener : o.removeEventListener;
			a(t ? "touchmove" : "mousemove", e), a(t ? "touchend" : "mouseup", r);
		}
		return [
			function(e) {
				var r = e.nativeEvent, t = m.current;
				if (t && (h(r), !function(e, r) {
					return r && !f(e);
				}(r, C.current) && t)) {
					if (f(r)) {
						C.current = !0;
						var o = r.changedTouches || [];
						o.length && (E.current = o[0].identifier);
					}
					t.focus(), p(v(t, r, E.current)), n(!0);
				}
			},
			function(e) {
				var r = e.which || e.keyCode;
				r < 37 || r > 40 || (e.preventDefault(), b({
					left: 39 === r ? .05 : 37 === r ? -.05 : 0,
					top: 40 === r ? .05 : 38 === r ? -.05 : 0
				}));
			},
			function(e) {
				var r = e.which || e.keyCode;
				r >= 37 && r <= 40 && _();
			},
			n
		];
	}, [
		b,
		p,
		_
	]), H = x[0], M = x[1], N = x[2], w = x[3];
	return (0, import_react.useEffect)(function() {
		return w;
	}, [w]), import_react.createElement("div", l({}, g, {
		onTouchStart: H,
		onMouseDown: H,
		className: "react-colorful__interactive",
		ref: m,
		onKeyDown: M,
		onKeyUp: N,
		tabIndex: 0,
		role: "slider"
	}));
});
var m = function(e) {
	return e.filter(Boolean).join(" ");
};
var p = function(r) {
	var n = r.color, t = r.left, o = r.top, a = void 0 === o ? .5 : o, u = m(["react-colorful__pointer", r.className]);
	return import_react.createElement("div", {
		className: u,
		style: {
			top: 100 * a + "%",
			left: 100 * t + "%"
		}
	}, import_react.createElement("div", {
		className: "react-colorful__pointer-fill",
		style: { backgroundColor: n }
	}));
};
var b = function(e, r, n) {
	return void 0 === r && (r = 0), void 0 === n && (n = Math.pow(10, r)), Math.round(n * e) / n;
};
var y = function(e) {
	var r = e.s, n = e.v, t = e.a, o = (200 - r) * n / 100;
	return {
		h: b(e.h),
		s: b(o > 0 && o < 200 ? r * n / 100 / (o <= 100 ? o : 200 - o) * 100 : 0),
		l: b(o / 2),
		a: b(t, 2)
	};
};
var k = function(e) {
	var r = y(e);
	return "hsl(" + r.h + ", " + r.s + "%, " + r.l + "%)";
};
var q = function(e) {
	var r = y(e);
	return "hsla(" + r.h + ", " + r.s + "%, " + r.l + "%, " + r.a + ")";
};
var I = function(e) {
	var r = e.h, n = e.s, t = e.v, o = e.a;
	r = r / 360 * 6, n /= 100, t /= 100;
	var a = Math.floor(r), u = t * (1 - n), l = t * (1 - (r - a) * n), c = t * (1 - (1 - r + a) * n), i = a % 6;
	return {
		r: b(255 * [
			t,
			l,
			u,
			u,
			c,
			t
		][i]),
		g: b(255 * [
			c,
			t,
			t,
			l,
			u,
			u
		][i]),
		b: b(255 * [
			u,
			u,
			c,
			t,
			t,
			l
		][i]),
		a: b(o, 2)
	};
};
var L = function(e) {
	var r = e.r, n = e.g, t = e.b, o = e.a, a = Math.max(r, n, t), u = a - Math.min(r, n, t), l = u ? a === r ? (n - t) / u : a === n ? 2 + (t - r) / u : 4 + (r - n) / u : 0;
	return {
		h: 60 * (l < 0 ? l + 6 : l),
		s: a ? u / a * 100 : 0,
		v: a / 255 * 100,
		a: o
	};
};
var R = import_react.memo(function(r) {
	var n = r.hue, t = r.onChange, o = r.onChangeEnd, a = m(["react-colorful__hue", r.className]);
	return import_react.createElement("div", { className: a }, import_react.createElement(g, {
		onMove: function(e) {
			t({ h: 360 * e.left });
		},
		onKey: function(e) {
			t({ h: s(n + 360 * e.left, 0, 360) });
		},
		onEnd: o,
		"aria-label": "Hue",
		"aria-valuenow": b(n),
		"aria-valuemax": "360",
		"aria-valuemin": "0"
	}, import_react.createElement(p, {
		className: "react-colorful__hue-pointer",
		left: n / 360,
		color: k({
			h: n,
			s: 100,
			v: 100,
			a: 1
		})
	})));
});
var S = import_react.memo(function(r) {
	var n = r.hsva, t = r.onChange, o = r.onChangeEnd, a = { backgroundColor: k({
		h: n.h,
		s: 100,
		v: 100,
		a: 1
	}) };
	return import_react.createElement("div", {
		className: "react-colorful__saturation",
		style: a
	}, import_react.createElement(g, {
		onMove: function(e) {
			t({
				s: 100 * e.left,
				v: 100 - 100 * e.top
			});
		},
		onKey: function(e) {
			t({
				s: s(n.s + 100 * e.left, 0, 100),
				v: s(n.v - 100 * e.top, 0, 100)
			});
		},
		onEnd: o,
		"aria-label": "Color",
		"aria-valuetext": "Saturation " + b(n.s) + "%, Brightness " + b(n.v) + "%"
	}, import_react.createElement(p, {
		className: "react-colorful__saturation-pointer",
		top: 1 - n.v / 100,
		left: n.s / 100,
		color: k(n)
	})));
});
var T = function(e, r) {
	if (e === r) return !0;
	for (var n in e) if (e[n] !== r[n]) return !1;
	return !0;
};
function X(e, n, u, l) {
	var c = i(u), s = i(l), f = (0, import_react.useState)(function() {
		return e.toHsva(n);
	}), d = f[0], v = f[1], h = (0, import_react.useRef)({
		color: n,
		hsva: d
	}), g = (0, import_react.useRef)(!1);
	(0, import_react.useEffect)(function() {
		if (!e.equal(n, h.current.color)) {
			var r = e.toHsva(n);
			h.current = {
				hsva: r,
				color: n
			}, v(r), g.current = !1;
		}
	}, [n, e]), (0, import_react.useEffect)(function() {
		var r;
		T(d, h.current.hsva) || e.equal(r = e.fromHsva(d), h.current.color) || (h.current = {
			hsva: d,
			color: r
		}, c(r), g.current = !0);
	}, [
		d,
		e,
		c
	]);
	return [
		d,
		(0, import_react.useCallback)(function(e) {
			v(function(r) {
				return Object.assign({}, r, e);
			});
		}, []),
		(0, import_react.useCallback)(function() {
			g.current && (g.current = !1, s(h.current.color));
		}, [s])
	];
}
var U = "undefined" != typeof window ? import_react.useLayoutEffect : import_react.useEffect;
var V = function() {
	return "undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : void 0;
};
var $ = /* @__PURE__ */ new WeakMap();
var G = function(e) {
	U(function() {
		var r = e.current;
		if ("undefined" != typeof document && r) {
			var n = r.getRootNode ? r.getRootNode() : r.ownerDocument, t = n && ("head" in n || "host" in n) ? n : r.ownerDocument;
			if (!$.has(t)) {
				var o = "head" in t ? t.head : t, a = (o.ownerDocument || document).createElement("style");
				a.innerHTML = ".react-colorful{position:relative;display:flex;flex-direction:column;width:200px;height:200px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default}.react-colorful__saturation{position:relative;flex-grow:1;border-color:transparent;border-bottom:12px solid #000;border-radius:8px 8px 0 0;background-image:linear-gradient(0deg,#000,transparent),linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.react-colorful__alpha-gradient,.react-colorful__pointer-fill{content:\"\";position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;border-radius:inherit}.react-colorful__alpha-gradient,.react-colorful__saturation{box-shadow:inset 0 0 0 1px rgba(0,0,0,.05)}.react-colorful__alpha,.react-colorful__hue{position:relative;height:24px}.react-colorful__hue{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.react-colorful__last-control{border-radius:0 0 8px 8px}.react-colorful__interactive{position:absolute;left:0;top:0;right:0;bottom:0;border-radius:inherit;outline:none;touch-action:none}.react-colorful__pointer{position:absolute;z-index:1;box-sizing:border-box;width:28px;height:28px;transform:translate(-50%,-50%);background-color:#fff;border:2px solid #fff;border-radius:50%;box-shadow:0 2px 4px rgba(0,0,0,.2)}.react-colorful__interactive:focus .react-colorful__pointer{transform:translate(-50%,-50%) scale(1.1)}.react-colorful__alpha,.react-colorful__alpha-pointer{background-color:#fff;background-image:url('data:image/svg+xml;charset=utf-8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill-opacity=\".05\"><path d=\"M8 0h8v8H8zM0 8h8v8H0z\"/></svg>')}.react-colorful__saturation-pointer{z-index:3}.react-colorful__hue-pointer{z-index:2}";
				var u = V();
				u && a.setAttribute("nonce", u), $.set(t, a), o.appendChild(a);
			}
		}
	}, []);
};
var J = function(n) {
	var t = n.className, o = n.colorModel, a = n.color, u = void 0 === a ? o.defaultColor : a, i = n.onChange, s = n.onChangeEnd, f = c(n, [
		"className",
		"colorModel",
		"color",
		"onChange",
		"onChangeEnd"
	]), d = (0, import_react.useRef)(null);
	G(d);
	var v = X(o, u, i, s), h = v[0], g = v[1], p = v[2], b = m(["react-colorful", t]);
	return import_react.createElement("div", l({}, f, {
		ref: d,
		className: b
	}), import_react.createElement(S, {
		hsva: h,
		onChange: g,
		onChangeEnd: p
	}), import_react.createElement(R, {
		hue: h.h,
		onChange: g,
		onChangeEnd: p,
		className: "react-colorful__last-control"
	}));
};
var ee = function(r) {
	var n = r.className, t = r.hsva, o = r.onChange, a = r.onChangeEnd, u = { backgroundImage: "linear-gradient(90deg, " + q(Object.assign({}, t, { a: 0 })) + ", " + q(Object.assign({}, t, { a: 1 })) + ")" }, l = m(["react-colorful__alpha", n]), c = b(100 * t.a);
	return import_react.createElement("div", { className: l }, import_react.createElement("div", {
		className: "react-colorful__alpha-gradient",
		style: u
	}), import_react.createElement(g, {
		onMove: function(e) {
			o({ a: e.left });
		},
		onKey: function(e) {
			o({ a: s(t.a + e.left) });
		},
		onEnd: a,
		"aria-label": "Alpha",
		"aria-valuetext": c + "%",
		"aria-valuenow": c,
		"aria-valuemin": "0",
		"aria-valuemax": "100"
	}, import_react.createElement(p, {
		className: "react-colorful__alpha-pointer",
		left: t.a,
		color: q(t)
	})));
};
var re = function(n) {
	var t = n.className, o = n.colorModel, a = n.color, u = void 0 === a ? o.defaultColor : a, i = n.onChange, s = n.onChangeEnd, f = c(n, [
		"className",
		"colorModel",
		"color",
		"onChange",
		"onChangeEnd"
	]), d = (0, import_react.useRef)(null);
	G(d);
	var v = X(o, u, i, s), h = v[0], g = v[1], p = v[2], b = m(["react-colorful", t]);
	return import_react.createElement("div", l({}, f, {
		ref: d,
		className: b
	}), import_react.createElement(S, {
		hsva: h,
		onChange: g,
		onChangeEnd: p
	}), import_react.createElement(R, {
		hue: h.h,
		onChange: g,
		onChangeEnd: p
	}), import_react.createElement(ee, {
		hsva: h,
		onChange: g,
		onChangeEnd: p,
		className: "react-colorful__last-control"
	}));
};
var Ee = {
	defaultColor: {
		r: 0,
		g: 0,
		b: 0,
		a: 1
	},
	toHsva: L,
	fromHsva: I,
	equal: T
};
var Ce = function(r) {
	return import_react.createElement(re, l({}, r, { colorModel: Ee }));
};
var Me = {
	defaultColor: {
		r: 0,
		g: 0,
		b: 0
	},
	toHsva: function(e) {
		return L({
			r: e.r,
			g: e.g,
			b: e.b,
			a: 1
		});
	},
	fromHsva: function(e) {
		return {
			r: (r = I(e)).r,
			g: r.g,
			b: r.b
		};
		var r;
	},
	equal: T
};
var Ne = function(r) {
	return import_react.createElement(J, l({}, r, { colorModel: Me }));
};
//#endregion
//#region node_modules/prop-types/lib/ReactPropTypesSecret.js
/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_ReactPropTypesSecret = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
}));
//#endregion
//#region node_modules/prop-types/factoryWithThrowingShims.js
/**
* Copyright (c) 2013-present, Facebook, Inc.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_factoryWithThrowingShims = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var ReactPropTypesSecret = require_ReactPropTypesSecret();
	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;
	module.exports = function() {
		function shim(props, propName, componentName, location, propFullName, secret) {
			if (secret === ReactPropTypesSecret) return;
			var err = /* @__PURE__ */ new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
			err.name = "Invariant Violation";
			throw err;
		}
		shim.isRequired = shim;
		function getShim() {
			return shim;
		}
		var ReactPropTypes = {
			array: shim,
			bigint: shim,
			bool: shim,
			func: shim,
			number: shim,
			object: shim,
			string: shim,
			symbol: shim,
			any: shim,
			arrayOf: getShim,
			element: shim,
			elementType: shim,
			instanceOf: getShim,
			node: shim,
			objectOf: getShim,
			oneOf: getShim,
			oneOfType: getShim,
			shape: getShim,
			exact: getShim,
			checkPropTypes: emptyFunctionWithReset,
			resetWarningCache: emptyFunction
		};
		ReactPropTypes.PropTypes = ReactPropTypes;
		return ReactPropTypes;
	};
}));
//#endregion
//#region node_modules/prop-types/index.js
var require_prop_types = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_factoryWithThrowingShims()();
}));
//#endregion
//#region node_modules/file-selector/dist/es5/file.js
var COMMON_MIME_TYPES = /* @__PURE__ */ new Map([
	["aac", "audio/aac"],
	["abw", "application/x-abiword"],
	["arc", "application/x-freearc"],
	["avif", "image/avif"],
	["avi", "video/x-msvideo"],
	["azw", "application/vnd.amazon.ebook"],
	["bin", "application/octet-stream"],
	["bmp", "image/bmp"],
	["bz", "application/x-bzip"],
	["bz2", "application/x-bzip2"],
	["cda", "application/x-cdf"],
	["csh", "application/x-csh"],
	["css", "text/css"],
	["csv", "text/csv"],
	["doc", "application/msword"],
	["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
	["eot", "application/vnd.ms-fontobject"],
	["epub", "application/epub+zip"],
	["gz", "application/gzip"],
	["gif", "image/gif"],
	["heic", "image/heic"],
	["heif", "image/heif"],
	["htm", "text/html"],
	["html", "text/html"],
	["ico", "image/vnd.microsoft.icon"],
	["ics", "text/calendar"],
	["jar", "application/java-archive"],
	["jpeg", "image/jpeg"],
	["jpg", "image/jpeg"],
	["js", "text/javascript"],
	["json", "application/json"],
	["jsonld", "application/ld+json"],
	["mid", "audio/midi"],
	["midi", "audio/midi"],
	["mjs", "text/javascript"],
	["mp3", "audio/mpeg"],
	["mp4", "video/mp4"],
	["mpeg", "video/mpeg"],
	["mpkg", "application/vnd.apple.installer+xml"],
	["odp", "application/vnd.oasis.opendocument.presentation"],
	["ods", "application/vnd.oasis.opendocument.spreadsheet"],
	["odt", "application/vnd.oasis.opendocument.text"],
	["oga", "audio/ogg"],
	["ogv", "video/ogg"],
	["ogx", "application/ogg"],
	["opus", "audio/opus"],
	["otf", "font/otf"],
	["png", "image/png"],
	["pdf", "application/pdf"],
	["php", "application/x-httpd-php"],
	["ppt", "application/vnd.ms-powerpoint"],
	["pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation"],
	["rar", "application/vnd.rar"],
	["rtf", "application/rtf"],
	["sh", "application/x-sh"],
	["svg", "image/svg+xml"],
	["swf", "application/x-shockwave-flash"],
	["tar", "application/x-tar"],
	["tif", "image/tiff"],
	["tiff", "image/tiff"],
	["ts", "video/mp2t"],
	["ttf", "font/ttf"],
	["txt", "text/plain"],
	["vsd", "application/vnd.visio"],
	["wav", "audio/wav"],
	["weba", "audio/webm"],
	["webm", "video/webm"],
	["webp", "image/webp"],
	["woff", "font/woff"],
	["woff2", "font/woff2"],
	["xhtml", "application/xhtml+xml"],
	["xls", "application/vnd.ms-excel"],
	["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
	["xml", "application/xml"],
	["xul", "application/vnd.mozilla.xul+xml"],
	["zip", "application/zip"],
	["7z", "application/x-7z-compressed"],
	["mkv", "video/x-matroska"],
	["mov", "video/quicktime"],
	["msg", "application/vnd.ms-outlook"]
]);
function toFileWithPath(file, path) {
	var f = withMimeType(file);
	if (typeof f.path !== "string") {
		var webkitRelativePath = file.webkitRelativePath;
		Object.defineProperty(f, "path", {
			value: typeof path === "string" ? path : typeof webkitRelativePath === "string" && webkitRelativePath.length > 0 ? webkitRelativePath : file.name,
			writable: false,
			configurable: false,
			enumerable: true
		});
	}
	return f;
}
function withMimeType(file) {
	var name = file.name;
	if (name && name.lastIndexOf(".") !== -1 && !file.type) {
		var ext = name.split(".").pop().toLowerCase();
		var type = COMMON_MIME_TYPES.get(ext);
		if (type) Object.defineProperty(file, "type", {
			value: type,
			writable: false,
			configurable: false,
			enumerable: true
		});
	}
	return file;
}
//#endregion
//#region node_modules/file-selector/dist/es5/file-selector.js
var FILES_TO_IGNORE = [".DS_Store", "Thumbs.db"];
/**
* Convert a DragEvent's DataTrasfer object to a list of File objects
* NOTE: If some of the items are folders,
* everything will be flattened and placed in the same list but the paths will be kept as a {path} property.
*
* EXPERIMENTAL: A list of https://developer.mozilla.org/en-US/docs/Web/API/FileSystemHandle objects can also be passed as an arg
* and a list of File objects will be returned.
*
* @param evt
*/
function fromEvent(evt) {
	return __awaiter(this, void 0, void 0, function() {
		return __generator(this, function(_a) {
			if (isObject(evt) && isDataTransfer(evt)) return [2, getDataTransferFiles(evt.dataTransfer, evt.type)];
			else if (isChangeEvt(evt)) return [2, getInputFiles(evt)];
			else if (Array.isArray(evt) && evt.every(function(item) {
				return "getFile" in item && typeof item.getFile === "function";
			})) return [2, getFsHandleFiles(evt)];
			return [2, []];
		});
	});
}
function isDataTransfer(value) {
	return isObject(value.dataTransfer);
}
function isChangeEvt(value) {
	return isObject(value) && isObject(value.target);
}
function isObject(v) {
	return typeof v === "object" && v !== null;
}
function getInputFiles(evt) {
	return fromList(evt.target.files).map(function(file) {
		return toFileWithPath(file);
	});
}
function getFsHandleFiles(handles) {
	return __awaiter(this, void 0, void 0, function() {
		var files;
		return __generator(this, function(_a) {
			switch (_a.label) {
				case 0: return [4, Promise.all(handles.map(function(h) {
					return h.getFile();
				}))];
				case 1:
					files = _a.sent();
					return [2, files.map(function(file) {
						return toFileWithPath(file);
					})];
			}
		});
	});
}
function getDataTransferFiles(dt, type) {
	return __awaiter(this, void 0, void 0, function() {
		var items, files;
		return __generator(this, function(_a) {
			switch (_a.label) {
				case 0:
					if (dt === null) return [2, []];
					if (!dt.items) return [3, 2];
					items = fromList(dt.items).filter(function(item) {
						return item.kind === "file";
					});
					if (type !== "drop") return [2, items];
					return [4, Promise.all(items.map(toFilePromises))];
				case 1:
					files = _a.sent();
					return [2, noIgnoredFiles(flatten(files))];
				case 2: return [2, noIgnoredFiles(fromList(dt.files).map(function(file) {
					return toFileWithPath(file);
				}))];
			}
		});
	});
}
function noIgnoredFiles(files) {
	return files.filter(function(file) {
		return FILES_TO_IGNORE.indexOf(file.name) === -1;
	});
}
function fromList(items) {
	if (items === null) return [];
	var files = [];
	for (var i = 0; i < items.length; i++) {
		var file = items[i];
		files.push(file);
	}
	return files;
}
function toFilePromises(item) {
	if (typeof item.webkitGetAsEntry !== "function") return fromDataTransferItem(item);
	var entry = item.webkitGetAsEntry();
	if (entry && entry.isDirectory) return fromDirEntry(entry);
	return fromDataTransferItem(item);
}
function flatten(items) {
	return items.reduce(function(acc, files) {
		return __spread(acc, Array.isArray(files) ? flatten(files) : [files]);
	}, []);
}
function fromDataTransferItem(item) {
	var file = item.getAsFile();
	if (!file) return Promise.reject(item + " is not a File");
	var fwp = toFileWithPath(file);
	return Promise.resolve(fwp);
}
function fromEntry(entry) {
	return __awaiter(this, void 0, void 0, function() {
		return __generator(this, function(_a) {
			return [2, entry.isDirectory ? fromDirEntry(entry) : fromFileEntry(entry)];
		});
	});
}
function fromDirEntry(entry) {
	var reader = entry.createReader();
	return new Promise(function(resolve, reject) {
		var entries = [];
		function readEntries() {
			var _this = this;
			reader.readEntries(function(batch) {
				return __awaiter(_this, void 0, void 0, function() {
					var files, err_1, items;
					return __generator(this, function(_a) {
						switch (_a.label) {
							case 0:
								if (!!batch.length) return [3, 5];
								_a.label = 1;
							case 1:
								_a.trys.push([
									1,
									3,
									,
									4
								]);
								return [4, Promise.all(entries)];
							case 2:
								files = _a.sent();
								resolve(files);
								return [3, 4];
							case 3:
								err_1 = _a.sent();
								reject(err_1);
								return [3, 4];
							case 4: return [3, 6];
							case 5:
								items = Promise.all(batch.map(fromEntry));
								entries.push(items);
								readEntries();
								_a.label = 6;
							case 6: return [2];
						}
					});
				});
			}, function(err) {
				reject(err);
			});
		}
		readEntries();
	});
}
function fromFileEntry(entry) {
	return __awaiter(this, void 0, void 0, function() {
		return __generator(this, function(_a) {
			return [2, new Promise(function(resolve, reject) {
				entry.file(function(file) {
					resolve(toFileWithPath(file, entry.fullPath));
				}, function(err) {
					reject(err);
				});
			})];
		});
	});
}
//#endregion
//#region node_modules/attr-accept/dist/es/index.js
var require_es = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.__esModule = true;
	exports.default = function(file, acceptedFiles) {
		if (file && acceptedFiles) {
			var acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(",");
			if (acceptedFilesArray.length === 0) return true;
			var fileName = file.name || "";
			var mimeType = (file.type || "").toLowerCase();
			var baseMimeType = mimeType.replace(/\/.*$/, "");
			return acceptedFilesArray.some(function(type) {
				var validType = type.trim().toLowerCase();
				if (validType.charAt(0) === ".") return fileName.toLowerCase().endsWith(validType);
				else if (validType.endsWith("/*")) return baseMimeType === validType.replace(/\/.*$/, "");
				return mimeType === validType;
			});
		}
		return true;
	};
}));
//#endregion
//#region node_modules/react-dropzone/dist/es/utils/index.js
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
var import_es = /* @__PURE__ */ __toESM(require_es());
function ownKeys$1(object, enumerableOnly) {
	var keys = Object.keys(object);
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object);
		enumerableOnly && (symbols = symbols.filter(function(sym) {
			return Object.getOwnPropertyDescriptor(object, sym).enumerable;
		})), keys.push.apply(keys, symbols);
	}
	return keys;
}
function _objectSpread$1(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = null != arguments[i] ? arguments[i] : {};
		i % 2 ? ownKeys$1(Object(source), !0).forEach(function(key) {
			_defineProperty$1(target, key, source[key]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function(key) {
			Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
		});
	}
	return target;
}
function _defineProperty$1(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _slicedToArray$1(arr, i) {
	return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
}
function _nonIterableRest$1() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray$1(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
}
function _arrayLikeToArray$1(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit$1(arr, i) {
	var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
	if (_i == null) return;
	var _arr = [];
	var _n = true;
	var _d = false;
	var _s, _e;
	try {
		for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
			_arr.push(_s.value);
			if (i && _arr.length === i) break;
		}
	} catch (err) {
		_d = true;
		_e = err;
	} finally {
		try {
			if (!_n && _i["return"] != null) _i["return"]();
		} finally {
			if (_d) throw _e;
		}
	}
	return _arr;
}
function _arrayWithHoles$1(arr) {
	if (Array.isArray(arr)) return arr;
}
var FILE_INVALID_TYPE = "file-invalid-type";
var FILE_TOO_LARGE = "file-too-large";
var FILE_TOO_SMALL = "file-too-small";
var TOO_MANY_FILES = "too-many-files";
var getInvalidTypeRejectionErr = function getInvalidTypeRejectionErr(accept) {
	accept = Array.isArray(accept) && accept.length === 1 ? accept[0] : accept;
	var messageSuffix = Array.isArray(accept) ? "one of ".concat(accept.join(", ")) : accept;
	return {
		code: FILE_INVALID_TYPE,
		message: "File type must be ".concat(messageSuffix)
	};
};
var getTooLargeRejectionErr = function getTooLargeRejectionErr(maxSize) {
	return {
		code: FILE_TOO_LARGE,
		message: "File is larger than ".concat(maxSize, " ").concat(maxSize === 1 ? "byte" : "bytes")
	};
};
var getTooSmallRejectionErr = function getTooSmallRejectionErr(minSize) {
	return {
		code: FILE_TOO_SMALL,
		message: "File is smaller than ".concat(minSize, " ").concat(minSize === 1 ? "byte" : "bytes")
	};
};
var TOO_MANY_FILES_REJECTION = {
	code: TOO_MANY_FILES,
	message: "Too many files"
};
function fileAccepted(file, accept) {
	var isAcceptable = file.type === "application/x-moz-file" || (0, import_es.default)(file, accept);
	return [isAcceptable, isAcceptable ? null : getInvalidTypeRejectionErr(accept)];
}
function fileMatchSize(file, minSize, maxSize) {
	if (isDefined(file.size)) {
		if (isDefined(minSize) && isDefined(maxSize)) {
			if (file.size > maxSize) return [false, getTooLargeRejectionErr(maxSize)];
			if (file.size < minSize) return [false, getTooSmallRejectionErr(minSize)];
		} else if (isDefined(minSize) && file.size < minSize) return [false, getTooSmallRejectionErr(minSize)];
		else if (isDefined(maxSize) && file.size > maxSize) return [false, getTooLargeRejectionErr(maxSize)];
	}
	return [true, null];
}
function isDefined(value) {
	return value !== void 0 && value !== null;
}
function allFilesAccepted(_ref) {
	var files = _ref.files, accept = _ref.accept, minSize = _ref.minSize, maxSize = _ref.maxSize, multiple = _ref.multiple, maxFiles = _ref.maxFiles;
	if (!multiple && files.length > 1 || multiple && maxFiles >= 1 && files.length > maxFiles) return false;
	return files.every(function(file) {
		var accepted = _slicedToArray$1(fileAccepted(file, accept), 1)[0];
		var sizeMatch = _slicedToArray$1(fileMatchSize(file, minSize, maxSize), 1)[0];
		return accepted && sizeMatch;
	});
}
function isPropagationStopped(event) {
	if (typeof event.isPropagationStopped === "function") return event.isPropagationStopped();
	else if (typeof event.cancelBubble !== "undefined") return event.cancelBubble;
	return false;
}
function isEvtWithFiles(event) {
	if (!event.dataTransfer) return !!event.target && !!event.target.files;
	return Array.prototype.some.call(event.dataTransfer.types, function(type) {
		return type === "Files" || type === "application/x-moz-file";
	});
}
function onDocumentDragOver(event) {
	event.preventDefault();
}
function isIe(userAgent) {
	return userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident/") !== -1;
}
function isEdge(userAgent) {
	return userAgent.indexOf("Edge/") !== -1;
}
function isIeOrEdge() {
	var userAgent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.navigator.userAgent;
	return isIe(userAgent) || isEdge(userAgent);
}
/**
* This is intended to be used to compose event handlers
* They are executed in order until one of them calls `event.isPropagationStopped()`.
* Note that the check is done on the first invoke too,
* meaning that if propagation was stopped before invoking the fns,
* no handlers will be executed.
*
* @param {Function} fns the event hanlder functions
* @return {Function} the event handler to add to an element
*/
function composeEventHandlers() {
	for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) fns[_key] = arguments[_key];
	return function(event) {
		for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
		return fns.some(function(fn) {
			if (!isPropagationStopped(event) && fn) fn.apply(void 0, [event].concat(args));
			return isPropagationStopped(event);
		});
	};
}
/**
* canUseFileSystemAccessAPI checks if the [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API)
* is supported by the browser.
* @returns {boolean}
*/
function canUseFileSystemAccessAPI() {
	return "showOpenFilePicker" in window;
}
/**
* filePickerOptionsTypes returns the {types} option for https://developer.mozilla.org/en-US/docs/Web/API/window/showOpenFilePicker
* based on the accept attr (see https://github.com/react-dropzone/attr-accept)
* E.g: converts ['image/*', 'text/*'] to {'image/*': [], 'text/*': []}
* @param {string|string[]} accept
*/
function filePickerOptionsTypes(accept) {
	accept = typeof accept === "string" ? accept.split(",") : accept;
	return [{
		description: "everything",
		accept: Array.isArray(accept) ? accept.filter(function(item) {
			return item === "audio/*" || item === "video/*" || item === "image/*" || item === "text/*" || /\w+\/[-+.\w]+/g.test(item);
		}).reduce(function(a, b) {
			return _objectSpread$1(_objectSpread$1({}, a), {}, _defineProperty$1({}, b, []));
		}, {}) : {}
	}];
}
/**
* Check if v is an exception caused by aborting a request (e.g window.showOpenFilePicker()).
*
* See https://developer.mozilla.org/en-US/docs/Web/API/DOMException.
* @param {any} v
* @returns {boolean} True if v is an abort exception.
*/
function isAbort(v) {
	return v instanceof DOMException && (v.name === "AbortError" || v.code === v.ABORT_ERR);
}
/**
* Check if v is a security error.
*
* See https://developer.mozilla.org/en-US/docs/Web/API/DOMException.
* @param {any} v
* @returns {boolean} True if v is a security error.
*/
function isSecurityError(v) {
	return v instanceof DOMException && (v.name === "SecurityError" || v.code === v.SECURITY_ERR);
}
//#endregion
//#region node_modules/react-dropzone/dist/es/index.js
var _excluded = ["children"];
var _excluded2$2 = ["open"];
var _excluded3 = [
	"refKey",
	"role",
	"onKeyDown",
	"onFocus",
	"onBlur",
	"onClick",
	"onDragEnter",
	"onDragOver",
	"onDragLeave",
	"onDrop"
];
var _excluded4 = [
	"refKey",
	"onChange",
	"onClick"
];
function _toConsumableArray(arr) {
	return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
	throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(iter) {
	if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
	if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _slicedToArray(arr, i) {
	return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
	throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _iterableToArrayLimit(arr, i) {
	var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
	if (_i == null) return;
	var _arr = [];
	var _n = true;
	var _d = false;
	var _s, _e;
	try {
		for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
			_arr.push(_s.value);
			if (i && _arr.length === i) break;
		}
	} catch (err) {
		_d = true;
		_e = err;
	} finally {
		try {
			if (!_n && _i["return"] != null) _i["return"]();
		} finally {
			if (_d) throw _e;
		}
	}
	return _arr;
}
function _arrayWithHoles(arr) {
	if (Array.isArray(arr)) return arr;
}
function ownKeys(object, enumerableOnly) {
	var keys = Object.keys(object);
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(object);
		enumerableOnly && (symbols = symbols.filter(function(sym) {
			return Object.getOwnPropertyDescriptor(object, sym).enumerable;
		})), keys.push.apply(keys, symbols);
	}
	return keys;
}
function _objectSpread(target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = null != arguments[i] ? arguments[i] : {};
		i % 2 ? ownKeys(Object(source), !0).forEach(function(key) {
			_defineProperty(target, key, source[key]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
			Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
		});
	}
	return target;
}
function _defineProperty(obj, key, value) {
	if (key in obj) Object.defineProperty(obj, key, {
		value,
		enumerable: true,
		configurable: true,
		writable: true
	});
	else obj[key] = value;
	return obj;
}
function _objectWithoutProperties(source, excluded) {
	if (source == null) return {};
	var target = _objectWithoutPropertiesLoose(source, excluded);
	var key, i;
	if (Object.getOwnPropertySymbols) {
		var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
		for (i = 0; i < sourceSymbolKeys.length; i++) {
			key = sourceSymbolKeys[i];
			if (excluded.indexOf(key) >= 0) continue;
			if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
			target[key] = source[key];
		}
	}
	return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
	if (source == null) return {};
	var target = {};
	var sourceKeys = Object.keys(source);
	var key, i = 0;
	for (; i < sourceKeys.length; i++) {
		key = sourceKeys[i];
		if (excluded.indexOf(key) >= 0) continue;
		target[key] = source[key];
	}
	return target;
}
/**
* Convenience wrapper component for the `useDropzone` hook
*
* ```jsx
* <Dropzone>
*   {({getRootProps, getInputProps}) => (
*     <div {...getRootProps()}>
*       <input {...getInputProps()} />
*       <p>Drag 'n' drop some files here, or click to select files</p>
*     </div>
*   )}
* </Dropzone>
* ```
*/
var Dropzone = /*#__PURE__*/ (0, import_react.forwardRef)(function(_ref, ref) {
	var children = _ref.children;
	var _useDropzone = useDropzone(_objectWithoutProperties(_ref, _excluded)), open = _useDropzone.open, props = _objectWithoutProperties(_useDropzone, _excluded2$2);
	(0, import_react.useImperativeHandle)(ref, function() {
		return { open };
	}, [open]);
	return /*#__PURE__*/ import_react.createElement(import_react.Fragment, null, children(_objectSpread(_objectSpread({}, props), {}, { open })));
});
Dropzone.displayName = "Dropzone";
var defaultProps = {
	disabled: false,
	getFilesFromEvent: fromEvent,
	maxSize: Infinity,
	minSize: 0,
	multiple: true,
	maxFiles: 0,
	preventDropOnDocument: true,
	noClick: false,
	noKeyboard: false,
	noDrag: false,
	noDragEventsBubbling: false,
	validator: null,
	useFsAccessApi: true
};
Dropzone.defaultProps = defaultProps;
Dropzone.propTypes = {
	/**
	* Render function that exposes the dropzone state and prop getter fns
	*
	* @param {object} params
	* @param {Function} params.getRootProps Returns the props you should apply to the root drop container you render
	* @param {Function} params.getInputProps Returns the props you should apply to hidden file input you render
	* @param {Function} params.open Open the native file selection dialog
	* @param {boolean} params.isFocused Dropzone area is in focus
	* @param {boolean} params.isFileDialogActive File dialog is opened
	* @param {boolean} params.isDragActive Active drag is in progress
	* @param {boolean} params.isDragAccept Dragged files are accepted
	* @param {boolean} params.isDragReject Some dragged files are rejected
	* @param {File[]} params.draggedFiles Files in active drag
	* @param {File[]} params.acceptedFiles Accepted files
	* @param {FileRejection[]} params.fileRejections Rejected files and why they were rejected
	*/
	children: import_prop_types.default.func,
	/**
	* Set accepted file types.
	* See https://github.com/okonet/attr-accept for more information.
	* Keep in mind that mime type determination is not reliable across platforms. CSV files,
	* for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
	* Windows. In some cases there might not be a mime type set at all.
	* See: https://github.com/react-dropzone/react-dropzone/issues/276
	*/
	accept: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.arrayOf(import_prop_types.default.string)]),
	/**
	* Allow drag 'n' drop (or selection from the file dialog) of multiple files
	*/
	multiple: import_prop_types.default.bool,
	/**
	* If false, allow dropped items to take over the current browser window
	*/
	preventDropOnDocument: import_prop_types.default.bool,
	/**
	* If true, disables click to open the native file selection dialog
	*/
	noClick: import_prop_types.default.bool,
	/**
	* If true, disables SPACE/ENTER to open the native file selection dialog.
	* Note that it also stops tracking the focus state.
	*/
	noKeyboard: import_prop_types.default.bool,
	/**
	* If true, disables drag 'n' drop
	*/
	noDrag: import_prop_types.default.bool,
	/**
	* If true, stops drag event propagation to parents
	*/
	noDragEventsBubbling: import_prop_types.default.bool,
	/**
	* Minimum file size (in bytes)
	*/
	minSize: import_prop_types.default.number,
	/**
	* Maximum file size (in bytes)
	*/
	maxSize: import_prop_types.default.number,
	/**
	* Maximum accepted number of files
	* The default value is 0 which means there is no limitation to how many files are accepted.
	*/
	maxFiles: import_prop_types.default.number,
	/**
	* Enable/disable the dropzone
	*/
	disabled: import_prop_types.default.bool,
	/**
	* Use this to provide a custom file aggregator
	*
	* @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
	*/
	getFilesFromEvent: import_prop_types.default.func,
	/**
	* Cb for when closing the file dialog with no selection
	*/
	onFileDialogCancel: import_prop_types.default.func,
	/**
	* Cb for when opening the file dialog
	*/
	onFileDialogOpen: import_prop_types.default.func,
	/**
	* Set to true to use the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
	* to open the file picker instead of using an `<input type="file">` click event.
	*/
	useFsAccessApi: import_prop_types.default.bool,
	/**
	* Cb for when the `dragenter` event occurs.
	*
	* @param {DragEvent} event
	*/
	onDragEnter: import_prop_types.default.func,
	/**
	* Cb for when the `dragleave` event occurs
	*
	* @param {DragEvent} event
	*/
	onDragLeave: import_prop_types.default.func,
	/**
	* Cb for when the `dragover` event occurs
	*
	* @param {DragEvent} event
	*/
	onDragOver: import_prop_types.default.func,
	/**
	* Cb for when the `drop` event occurs.
	* Note that this callback is invoked after the `getFilesFromEvent` callback is done.
	*
	* Files are accepted or rejected based on the `accept`, `multiple`, `minSize` and `maxSize` props.
	* `accept` must be a valid [MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml) according to [input element specification](https://www.w3.org/wiki/HTML/Elements/input/file) or a valid file extension.
	* If `multiple` is set to false and additional files are dropped,
	* all files besides the first will be rejected.
	* Any file which does not have a size in the [`minSize`, `maxSize`] range, will be rejected as well.
	*
	* Note that the `onDrop` callback will always be invoked regardless if the dropped files were accepted or rejected.
	* If you'd like to react to a specific scenario, use the `onDropAccepted`/`onDropRejected` props.
	*
	* `onDrop` will provide you with an array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects which you can then process and send to a server.
	* For example, with [SuperAgent](https://github.com/visionmedia/superagent) as a http/ajax library:
	*
	* ```js
	* function onDrop(acceptedFiles) {
	*   const req = request.post('/upload')
	*   acceptedFiles.forEach(file => {
	*     req.attach(file.name, file)
	*   })
	*   req.end(callback)
	* }
	* ```
	*
	* @param {File[]} acceptedFiles
	* @param {FileRejection[]} fileRejections
	* @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
	*/
	onDrop: import_prop_types.default.func,
	/**
	* Cb for when the `drop` event occurs.
	* Note that if no files are accepted, this callback is not invoked.
	*
	* @param {File[]} files
	* @param {(DragEvent|Event)} event
	*/
	onDropAccepted: import_prop_types.default.func,
	/**
	* Cb for when the `drop` event occurs.
	* Note that if no files are rejected, this callback is not invoked.
	*
	* @param {FileRejection[]} fileRejections
	* @param {(DragEvent|Event)} event
	*/
	onDropRejected: import_prop_types.default.func,
	/**
	* Custom validation function
	* @param {File} file
	* @returns {FileError|FileError[]}
	*/
	validator: import_prop_types.default.func
};
/**
* A function that is invoked for the `dragenter`,
* `dragover` and `dragleave` events.
* It is not invoked if the items are not files (such as link, text, etc.).
*
* @callback dragCb
* @param {DragEvent} event
*/
/**
* A function that is invoked for the `drop` or input change event.
* It is not invoked if the items are not files (such as link, text, etc.).
*
* @callback dropCb
* @param {File[]} acceptedFiles List of accepted files
* @param {FileRejection[]} fileRejections List of rejected files and why they were rejected
* @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
*/
/**
* A function that is invoked for the `drop` or input change event.
* It is not invoked if the items are files (such as link, text, etc.).
*
* @callback dropAcceptedCb
* @param {File[]} files List of accepted files that meet the given criteria
* (`accept`, `multiple`, `minSize`, `maxSize`)
* @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
*/
/**
* A function that is invoked for the `drop` or input change event.
*
* @callback dropRejectedCb
* @param {File[]} files List of rejected files that do not meet the given criteria
* (`accept`, `multiple`, `minSize`, `maxSize`)
* @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
*/
/**
* A function that is used aggregate files,
* in a asynchronous fashion, from drag or input change events.
*
* @callback getFilesFromEvent
* @param {(DragEvent|Event)} event A drag event or input change event (if files were selected via the file dialog)
* @returns {(File[]|Promise<File[]>)}
*/
/**
* An object with the current dropzone state and some helper functions.
*
* @typedef {object} DropzoneState
* @property {Function} getRootProps Returns the props you should apply to the root drop container you render
* @property {Function} getInputProps Returns the props you should apply to hidden file input you render
* @property {Function} open Open the native file selection dialog
* @property {boolean} isFocused Dropzone area is in focus
* @property {boolean} isFileDialogActive File dialog is opened
* @property {boolean} isDragActive Active drag is in progress
* @property {boolean} isDragAccept Dragged files are accepted
* @property {boolean} isDragReject Some dragged files are rejected
* @property {File[]} draggedFiles Files in active drag
* @property {File[]} acceptedFiles Accepted files
* @property {FileRejection[]} fileRejections Rejected files and why they were rejected
*/
var initialState = {
	isFocused: false,
	isFileDialogActive: false,
	isDragActive: false,
	isDragAccept: false,
	isDragReject: false,
	draggedFiles: [],
	acceptedFiles: [],
	fileRejections: []
};
/**
* A React hook that creates a drag 'n' drop area.
*
* ```jsx
* function MyDropzone(props) {
*   const {getRootProps, getInputProps} = useDropzone({
*     onDrop: acceptedFiles => {
*       // do something with the File objects, e.g. upload to some server
*     }
*   });
*   return (
*     <div {...getRootProps()}>
*       <input {...getInputProps()} />
*       <p>Drag and drop some files here, or click to select files</p>
*     </div>
*   )
* }
* ```
*
* @function useDropzone
*
* @param {object} props
* @param {string|string[]} [props.accept] Set accepted file types.
* See https://github.com/okonet/attr-accept for more information.
* Keep in mind that mime type determination is not reliable across platforms. CSV files,
* for example, are reported as text/plain under macOS but as application/vnd.ms-excel under
* Windows. In some cases there might not be a mime type set at all.
* See: https://github.com/react-dropzone/react-dropzone/issues/276
* @param {boolean} [props.multiple=true] Allow drag 'n' drop (or selection from the file dialog) of multiple files
* @param {boolean} [props.preventDropOnDocument=true] If false, allow dropped items to take over the current browser window
* @param {boolean} [props.noClick=false] If true, disables click to open the native file selection dialog
* @param {boolean} [props.noKeyboard=false] If true, disables SPACE/ENTER to open the native file selection dialog.
* Note that it also stops tracking the focus state.
* @param {boolean} [props.noDrag=false] If true, disables drag 'n' drop
* @param {boolean} [props.noDragEventsBubbling=false] If true, stops drag event propagation to parents
* @param {number} [props.minSize=0] Minimum file size (in bytes)
* @param {number} [props.maxSize=Infinity] Maximum file size (in bytes)
* @param {boolean} [props.disabled=false] Enable/disable the dropzone
* @param {getFilesFromEvent} [props.getFilesFromEvent] Use this to provide a custom file aggregator
* @param {Function} [props.onFileDialogCancel] Cb for when closing the file dialog with no selection
* @param {boolean} [props.useFsAccessApi] Set to true to use the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
* to open the file picker instead of using an `<input type="file">` click event.
* @param {Function} [props.onFileDialogOpen] Cb for when opening the file dialog
* @param {dragCb} [props.onDragEnter] Cb for when the `dragenter` event occurs.
* @param {dragCb} [props.onDragLeave] Cb for when the `dragleave` event occurs
* @param {dragCb} [props.onDragOver] Cb for when the `dragover` event occurs
* @param {dropCb} [props.onDrop] Cb for when the `drop` event occurs.
* Note that this callback is invoked after the `getFilesFromEvent` callback is done.
*
* Files are accepted or rejected based on the `accept`, `multiple`, `minSize` and `maxSize` props.
* `accept` must be a valid [MIME type](http://www.iana.org/assignments/media-types/media-types.xhtml) according to [input element specification](https://www.w3.org/wiki/HTML/Elements/input/file) or a valid file extension.
* If `multiple` is set to false and additional files are dropped,
* all files besides the first will be rejected.
* Any file which does not have a size in the [`minSize`, `maxSize`] range, will be rejected as well.
*
* Note that the `onDrop` callback will always be invoked regardless if the dropped files were accepted or rejected.
* If you'd like to react to a specific scenario, use the `onDropAccepted`/`onDropRejected` props.
*
* `onDrop` will provide you with an array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects which you can then process and send to a server.
* For example, with [SuperAgent](https://github.com/visionmedia/superagent) as a http/ajax library:
*
* ```js
* function onDrop(acceptedFiles) {
*   const req = request.post('/upload')
*   acceptedFiles.forEach(file => {
*     req.attach(file.name, file)
*   })
*   req.end(callback)
* }
* ```
* @param {dropAcceptedCb} [props.onDropAccepted]
* @param {dropRejectedCb} [props.onDropRejected]
*
* @returns {DropzoneState}
*/
function useDropzone() {
	var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
	var _defaultProps$options = _objectSpread(_objectSpread({}, defaultProps), options), accept = _defaultProps$options.accept, disabled = _defaultProps$options.disabled, getFilesFromEvent = _defaultProps$options.getFilesFromEvent, maxSize = _defaultProps$options.maxSize, minSize = _defaultProps$options.minSize, multiple = _defaultProps$options.multiple, maxFiles = _defaultProps$options.maxFiles, onDragEnter = _defaultProps$options.onDragEnter, onDragLeave = _defaultProps$options.onDragLeave, onDragOver = _defaultProps$options.onDragOver, onDrop = _defaultProps$options.onDrop, onDropAccepted = _defaultProps$options.onDropAccepted, onDropRejected = _defaultProps$options.onDropRejected, onFileDialogCancel = _defaultProps$options.onFileDialogCancel, onFileDialogOpen = _defaultProps$options.onFileDialogOpen, useFsAccessApi = _defaultProps$options.useFsAccessApi, preventDropOnDocument = _defaultProps$options.preventDropOnDocument, noClick = _defaultProps$options.noClick, noKeyboard = _defaultProps$options.noKeyboard, noDrag = _defaultProps$options.noDrag, noDragEventsBubbling = _defaultProps$options.noDragEventsBubbling, validator = _defaultProps$options.validator;
	var onFileDialogOpenCb = (0, import_react.useMemo)(function() {
		return typeof onFileDialogOpen === "function" ? onFileDialogOpen : noop;
	}, [onFileDialogOpen]);
	var onFileDialogCancelCb = (0, import_react.useMemo)(function() {
		return typeof onFileDialogCancel === "function" ? onFileDialogCancel : noop;
	}, [onFileDialogCancel]);
	var rootRef = (0, import_react.useRef)(null);
	var inputRef = (0, import_react.useRef)(null);
	var _useReducer2 = _slicedToArray((0, import_react.useReducer)(reducer, initialState), 2), state = _useReducer2[0], dispatch = _useReducer2[1];
	var isFocused = state.isFocused, isFileDialogActive = state.isFileDialogActive, draggedFiles = state.draggedFiles;
	var fsAccessApiWorksRef = (0, import_react.useRef)(typeof window !== "undefined" && window.isSecureContext && useFsAccessApi && canUseFileSystemAccessAPI());
	var onWindowFocus = function onWindowFocus() {
		if (!fsAccessApiWorksRef.current && isFileDialogActive) setTimeout(function() {
			if (inputRef.current) {
				if (!inputRef.current.files.length) {
					dispatch({ type: "closeDialog" });
					onFileDialogCancelCb();
				}
			}
		}, 300);
	};
	(0, import_react.useEffect)(function() {
		window.addEventListener("focus", onWindowFocus, false);
		return function() {
			window.removeEventListener("focus", onWindowFocus, false);
		};
	}, [
		inputRef,
		isFileDialogActive,
		onFileDialogCancelCb,
		fsAccessApiWorksRef
	]);
	var dragTargetsRef = (0, import_react.useRef)([]);
	var onDocumentDrop = function onDocumentDrop(event) {
		if (rootRef.current && rootRef.current.contains(event.target)) return;
		event.preventDefault();
		dragTargetsRef.current = [];
	};
	(0, import_react.useEffect)(function() {
		if (preventDropOnDocument) {
			document.addEventListener("dragover", onDocumentDragOver, false);
			document.addEventListener("drop", onDocumentDrop, false);
		}
		return function() {
			if (preventDropOnDocument) {
				document.removeEventListener("dragover", onDocumentDragOver);
				document.removeEventListener("drop", onDocumentDrop);
			}
		};
	}, [rootRef, preventDropOnDocument]);
	var onDragEnterCb = (0, import_react.useCallback)(function(event) {
		event.preventDefault();
		event.persist();
		stopPropagation(event);
		dragTargetsRef.current = [].concat(_toConsumableArray(dragTargetsRef.current), [event.target]);
		if (isEvtWithFiles(event)) Promise.resolve(getFilesFromEvent(event)).then(function(draggedFiles) {
			if (isPropagationStopped(event) && !noDragEventsBubbling) return;
			dispatch({
				draggedFiles,
				isDragActive: true,
				type: "setDraggedFiles"
			});
			if (onDragEnter) onDragEnter(event);
		});
	}, [
		getFilesFromEvent,
		onDragEnter,
		noDragEventsBubbling
	]);
	var onDragOverCb = (0, import_react.useCallback)(function(event) {
		event.preventDefault();
		event.persist();
		stopPropagation(event);
		var hasFiles = isEvtWithFiles(event);
		if (hasFiles && event.dataTransfer) try {
			event.dataTransfer.dropEffect = "copy";
		} catch (_unused) {}
		if (hasFiles && onDragOver) onDragOver(event);
		return false;
	}, [onDragOver, noDragEventsBubbling]);
	var onDragLeaveCb = (0, import_react.useCallback)(function(event) {
		event.preventDefault();
		event.persist();
		stopPropagation(event);
		var targets = dragTargetsRef.current.filter(function(target) {
			return rootRef.current && rootRef.current.contains(target);
		});
		var targetIdx = targets.indexOf(event.target);
		if (targetIdx !== -1) targets.splice(targetIdx, 1);
		dragTargetsRef.current = targets;
		if (targets.length > 0) return;
		dispatch({
			isDragActive: false,
			type: "setDraggedFiles",
			draggedFiles: []
		});
		if (isEvtWithFiles(event) && onDragLeave) onDragLeave(event);
	}, [
		rootRef,
		onDragLeave,
		noDragEventsBubbling
	]);
	var setFiles = (0, import_react.useCallback)(function(files, event) {
		var acceptedFiles = [];
		var fileRejections = [];
		files.forEach(function(file) {
			var _fileAccepted2 = _slicedToArray(fileAccepted(file, accept), 2), accepted = _fileAccepted2[0], acceptError = _fileAccepted2[1];
			var _fileMatchSize2 = _slicedToArray(fileMatchSize(file, minSize, maxSize), 2), sizeMatch = _fileMatchSize2[0], sizeError = _fileMatchSize2[1];
			var customErrors = validator ? validator(file) : null;
			if (accepted && sizeMatch && !customErrors) acceptedFiles.push(file);
			else {
				var errors = [acceptError, sizeError];
				if (customErrors) errors = errors.concat(customErrors);
				fileRejections.push({
					file,
					errors: errors.filter(function(e) {
						return e;
					})
				});
			}
		});
		if (!multiple && acceptedFiles.length > 1 || multiple && maxFiles >= 1 && acceptedFiles.length > maxFiles) {
			acceptedFiles.forEach(function(file) {
				fileRejections.push({
					file,
					errors: [TOO_MANY_FILES_REJECTION]
				});
			});
			acceptedFiles.splice(0);
		}
		dispatch({
			acceptedFiles,
			fileRejections,
			type: "setFiles"
		});
		if (onDrop) onDrop(acceptedFiles, fileRejections, event);
		if (fileRejections.length > 0 && onDropRejected) onDropRejected(fileRejections, event);
		if (acceptedFiles.length > 0 && onDropAccepted) onDropAccepted(acceptedFiles, event);
	}, [
		dispatch,
		multiple,
		accept,
		minSize,
		maxSize,
		maxFiles,
		onDrop,
		onDropAccepted,
		onDropRejected,
		validator
	]);
	var onDropCb = (0, import_react.useCallback)(function(event) {
		event.preventDefault();
		event.persist();
		stopPropagation(event);
		dragTargetsRef.current = [];
		if (isEvtWithFiles(event)) Promise.resolve(getFilesFromEvent(event)).then(function(files) {
			if (isPropagationStopped(event) && !noDragEventsBubbling) return;
			setFiles(files, event);
		});
		dispatch({ type: "reset" });
	}, [
		getFilesFromEvent,
		setFiles,
		noDragEventsBubbling
	]);
	var openFileDialog = (0, import_react.useCallback)(function() {
		if (fsAccessApiWorksRef.current) {
			dispatch({ type: "openDialog" });
			onFileDialogOpenCb();
			var opts = {
				multiple,
				types: filePickerOptionsTypes(accept)
			};
			window.showOpenFilePicker(opts).then(function(handles) {
				return getFilesFromEvent(handles);
			}).then(function(files) {
				setFiles(files, null);
				dispatch({ type: "closeDialog" });
			}).catch(function(e) {
				if (isAbort(e)) {
					onFileDialogCancelCb(e);
					dispatch({ type: "closeDialog" });
				} else if (isSecurityError(e)) {
					fsAccessApiWorksRef.current = false;
					if (inputRef.current) {
						inputRef.current.value = null;
						inputRef.current.click();
					}
				}
			});
			return;
		}
		if (inputRef.current) {
			dispatch({ type: "openDialog" });
			onFileDialogOpenCb();
			inputRef.current.value = null;
			inputRef.current.click();
		}
	}, [
		dispatch,
		onFileDialogOpenCb,
		onFileDialogCancelCb,
		useFsAccessApi,
		setFiles,
		accept,
		multiple
	]);
	var onKeyDownCb = (0, import_react.useCallback)(function(event) {
		if (!rootRef.current || !rootRef.current.isEqualNode(event.target)) return;
		if (event.key === " " || event.key === "Enter" || event.keyCode === 32 || event.keyCode === 13) {
			event.preventDefault();
			openFileDialog();
		}
	}, [rootRef, openFileDialog]);
	var onFocusCb = (0, import_react.useCallback)(function() {
		dispatch({ type: "focus" });
	}, []);
	var onBlurCb = (0, import_react.useCallback)(function() {
		dispatch({ type: "blur" });
	}, []);
	var onClickCb = (0, import_react.useCallback)(function() {
		if (noClick) return;
		if (isIeOrEdge()) setTimeout(openFileDialog, 0);
		else openFileDialog();
	}, [noClick, openFileDialog]);
	var composeHandler = function composeHandler(fn) {
		return disabled ? null : fn;
	};
	var composeKeyboardHandler = function composeKeyboardHandler(fn) {
		return noKeyboard ? null : composeHandler(fn);
	};
	var composeDragHandler = function composeDragHandler(fn) {
		return noDrag ? null : composeHandler(fn);
	};
	var stopPropagation = function stopPropagation(event) {
		if (noDragEventsBubbling) event.stopPropagation();
	};
	var getRootProps = (0, import_react.useMemo)(function() {
		return function() {
			var _ref2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref2$refKey = _ref2.refKey, refKey = _ref2$refKey === void 0 ? "ref" : _ref2$refKey, role = _ref2.role, onKeyDown = _ref2.onKeyDown, onFocus = _ref2.onFocus, onBlur = _ref2.onBlur, onClick = _ref2.onClick, onDragEnter = _ref2.onDragEnter, onDragOver = _ref2.onDragOver, onDragLeave = _ref2.onDragLeave, onDrop = _ref2.onDrop, rest = _objectWithoutProperties(_ref2, _excluded3);
			return _objectSpread(_objectSpread(_defineProperty({
				onKeyDown: composeKeyboardHandler(composeEventHandlers(onKeyDown, onKeyDownCb)),
				onFocus: composeKeyboardHandler(composeEventHandlers(onFocus, onFocusCb)),
				onBlur: composeKeyboardHandler(composeEventHandlers(onBlur, onBlurCb)),
				onClick: composeHandler(composeEventHandlers(onClick, onClickCb)),
				onDragEnter: composeDragHandler(composeEventHandlers(onDragEnter, onDragEnterCb)),
				onDragOver: composeDragHandler(composeEventHandlers(onDragOver, onDragOverCb)),
				onDragLeave: composeDragHandler(composeEventHandlers(onDragLeave, onDragLeaveCb)),
				onDrop: composeDragHandler(composeEventHandlers(onDrop, onDropCb)),
				role: typeof role === "string" && role !== "" ? role : "button"
			}, refKey, rootRef), !disabled && !noKeyboard ? { tabIndex: 0 } : {}), rest);
		};
	}, [
		rootRef,
		onKeyDownCb,
		onFocusCb,
		onBlurCb,
		onClickCb,
		onDragEnterCb,
		onDragOverCb,
		onDragLeaveCb,
		onDropCb,
		noKeyboard,
		noDrag,
		disabled
	]);
	var onInputElementClick = (0, import_react.useCallback)(function(event) {
		event.stopPropagation();
	}, []);
	var getInputProps = (0, import_react.useMemo)(function() {
		return function() {
			var _ref3 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref3$refKey = _ref3.refKey, refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey, onChange = _ref3.onChange, onClick = _ref3.onClick, rest = _objectWithoutProperties(_ref3, _excluded4);
			return _objectSpread(_objectSpread({}, _defineProperty({
				accept,
				multiple,
				type: "file",
				style: { display: "none" },
				onChange: composeHandler(composeEventHandlers(onChange, onDropCb)),
				onClick: composeHandler(composeEventHandlers(onClick, onInputElementClick)),
				tabIndex: -1
			}, refKey, inputRef)), rest);
		};
	}, [
		inputRef,
		accept,
		multiple,
		onDropCb,
		disabled
	]);
	var fileCount = draggedFiles.length;
	var isDragAccept = fileCount > 0 && allFilesAccepted({
		files: draggedFiles,
		accept,
		minSize,
		maxSize,
		multiple,
		maxFiles
	});
	var isDragReject = fileCount > 0 && !isDragAccept;
	return _objectSpread(_objectSpread({}, state), {}, {
		isDragAccept,
		isDragReject,
		isFocused: isFocused && !disabled,
		getRootProps,
		getInputProps,
		rootRef,
		inputRef,
		open: composeHandler(openFileDialog)
	});
}
function reducer(state, action) {
	/* istanbul ignore next */
	switch (action.type) {
		case "focus": return _objectSpread(_objectSpread({}, state), {}, { isFocused: true });
		case "blur": return _objectSpread(_objectSpread({}, state), {}, { isFocused: false });
		case "openDialog": return _objectSpread(_objectSpread({}, initialState), {}, { isFileDialogActive: true });
		case "closeDialog": return _objectSpread(_objectSpread({}, state), {}, { isFileDialogActive: false });
		case "setDraggedFiles":
			var isDragActive = action.isDragActive, draggedFiles = action.draggedFiles;
			return _objectSpread(_objectSpread({}, state), {}, {
				draggedFiles,
				isDragActive
			});
		case "setFiles": return _objectSpread(_objectSpread({}, state), {}, {
			acceptedFiles: action.acceptedFiles,
			fileRejections: action.fileRejections
		});
		case "reset": return _objectSpread({}, initialState);
		default: return state;
	}
}
function noop() {}
//#endregion
//#region node_modules/leva/node_modules/zustand/esm/index.js
function createStore(createState) {
	let state;
	const listeners = /* @__PURE__ */ new Set();
	const setState = (partial, replace) => {
		const nextState = typeof partial === "function" ? partial(state) : partial;
		if (nextState !== state) {
			const previousState = state;
			state = replace ? nextState : Object.assign({}, state, nextState);
			listeners.forEach((listener) => listener(state, previousState));
		}
	};
	const getState = () => state;
	const subscribeWithSelector = (listener, selector = getState, equalityFn = Object.is) => {
		console.warn("[DEPRECATED] Please use `subscribeWithSelector` middleware");
		let currentSlice = selector(state);
		function listenerToAdd() {
			const nextSlice = selector(state);
			if (!equalityFn(currentSlice, nextSlice)) {
				const previousSlice = currentSlice;
				listener(currentSlice = nextSlice, previousSlice);
			}
		}
		listeners.add(listenerToAdd);
		return () => listeners.delete(listenerToAdd);
	};
	const subscribe = (listener, selector, equalityFn) => {
		if (selector || equalityFn) return subscribeWithSelector(listener, selector, equalityFn);
		listeners.add(listener);
		return () => listeners.delete(listener);
	};
	const destroy = () => listeners.clear();
	const api = {
		setState,
		getState,
		subscribe,
		destroy
	};
	state = createState(setState, getState, api);
	return api;
}
var useIsomorphicLayoutEffect = typeof window === "undefined" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent) ? import_react.useEffect : import_react.useLayoutEffect;
function create(createState) {
	const api = typeof createState === "function" ? createStore(createState) : createState;
	const useStore = (selector = api.getState, equalityFn = Object.is) => {
		const [, forceUpdate] = (0, import_react.useReducer)((c) => c + 1, 0);
		const state = api.getState();
		const stateRef = (0, import_react.useRef)(state);
		const selectorRef = (0, import_react.useRef)(selector);
		const equalityFnRef = (0, import_react.useRef)(equalityFn);
		const erroredRef = (0, import_react.useRef)(false);
		const currentSliceRef = (0, import_react.useRef)();
		if (currentSliceRef.current === void 0) currentSliceRef.current = selector(state);
		let newStateSlice;
		let hasNewStateSlice = false;
		if (stateRef.current !== state || selectorRef.current !== selector || equalityFnRef.current !== equalityFn || erroredRef.current) {
			newStateSlice = selector(state);
			hasNewStateSlice = !equalityFn(currentSliceRef.current, newStateSlice);
		}
		useIsomorphicLayoutEffect(() => {
			if (hasNewStateSlice) currentSliceRef.current = newStateSlice;
			stateRef.current = state;
			selectorRef.current = selector;
			equalityFnRef.current = equalityFn;
			erroredRef.current = false;
		});
		const stateBeforeSubscriptionRef = (0, import_react.useRef)(state);
		useIsomorphicLayoutEffect(() => {
			const listener = () => {
				try {
					const nextState = api.getState();
					const nextStateSlice = selectorRef.current(nextState);
					if (!equalityFnRef.current(currentSliceRef.current, nextStateSlice)) {
						stateRef.current = nextState;
						currentSliceRef.current = nextStateSlice;
						forceUpdate();
					}
				} catch (error) {
					erroredRef.current = true;
					forceUpdate();
				}
			};
			const unsubscribe = api.subscribe(listener);
			if (api.getState() !== stateBeforeSubscriptionRef.current) listener();
			return unsubscribe;
		}, []);
		const sliceToReturn = hasNewStateSlice ? newStateSlice : currentSliceRef.current;
		(0, import_react.useDebugValue)(sliceToReturn);
		return sliceToReturn;
	};
	Object.assign(useStore, api);
	useStore[Symbol.iterator] = function() {
		console.warn("[useStore, api] = create() is deprecated and will be removed in v4");
		const items = [useStore, api];
		return { next() {
			const done = items.length <= 0;
			return {
				value: items.shift(),
				done
			};
		} };
	};
	return useStore;
}
//#endregion
//#region node_modules/leva/node_modules/zustand/esm/middleware.js
var subscribeWithSelector = (fn) => (set, get, api) => {
	const origSubscribe = api.subscribe;
	api.subscribe = (selector, optListener, options) => {
		let listener = selector;
		if (optListener) {
			const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
			let currentSlice = selector(api.getState());
			listener = (state) => {
				const nextSlice = selector(state);
				if (!equalityFn(currentSlice, nextSlice)) {
					const previousSlice = currentSlice;
					optListener(currentSlice = nextSlice, previousSlice);
				}
			};
			if (options == null ? void 0 : options.fireImmediately) optListener(currentSlice, currentSlice);
		}
		return origSubscribe(listener);
	};
	return fn(set, get, api);
};
//#endregion
//#region node_modules/isobject/index.js
/*!
* isobject <https://github.com/jonschlinkert/isobject>
*
* Copyright (c) 2014-2017, Jon Schlinkert.
* Released under the MIT License.
*/
var require_isobject = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function isObject(val) {
		return val != null && typeof val === "object" && Array.isArray(val) === false;
	};
}));
//#endregion
//#region node_modules/is-extendable/node_modules/is-plain-object/index.js
/*!
* is-plain-object <https://github.com/jonschlinkert/is-plain-object>
*
* Copyright (c) 2014-2017, Jon Schlinkert.
* Released under the MIT License.
*/
var require_is_plain_object$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isObject = require_isobject();
	function isObjectObject(o) {
		return isObject(o) === true && Object.prototype.toString.call(o) === "[object Object]";
	}
	module.exports = function isPlainObject(o) {
		var ctor, prot;
		if (isObjectObject(o) === false) return false;
		ctor = o.constructor;
		if (typeof ctor !== "function") return false;
		prot = ctor.prototype;
		if (isObjectObject(prot) === false) return false;
		if (prot.hasOwnProperty("isPrototypeOf") === false) return false;
		return true;
	};
}));
//#endregion
//#region node_modules/is-extendable/index.js
/*!
* is-extendable <https://github.com/jonschlinkert/is-extendable>
*
* Copyright (c) 2015-2017, Jon Schlinkert.
* Released under the MIT License.
*/
var require_is_extendable$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isPlainObject = require_is_plain_object$1();
	module.exports = function isExtendable(val) {
		return isPlainObject(val) || typeof val === "function" || Array.isArray(val);
	};
}));
//#endregion
//#region node_modules/for-in/index.js
/*!
* for-in <https://github.com/jonschlinkert/for-in>
*
* Copyright (c) 2014-2017, Jon Schlinkert.
* Released under the MIT License.
*/
var require_for_in = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function forIn(obj, fn, thisArg) {
		for (var key in obj) if (fn.call(thisArg, obj[key], key, obj) === false) break;
	};
}));
//#endregion
//#region node_modules/mixin-deep/index.js
var require_mixin_deep = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isExtendable = require_is_extendable$2();
	var forIn = require_for_in();
	function mixinDeep(target, objects) {
		var len = arguments.length, i = 0;
		while (++i < len) {
			var obj = arguments[i];
			if (isObject(obj)) forIn(obj, copy, target);
		}
		return target;
	}
	/**
	* Copy properties from the source object to the
	* target object.
	*
	* @param  {*} `val`
	* @param  {String} `key`
	*/
	function copy(val, key) {
		if (!isValidKey(key)) return;
		var obj = this[key];
		if (isObject(val) && isObject(obj)) mixinDeep(obj, val);
		else this[key] = val;
	}
	/**
	* Returns true if `val` is an object or function.
	*
	* @param  {any} val
	* @return {Boolean}
	*/
	function isObject(val) {
		return isExtendable(val) && !Array.isArray(val);
	}
	/**
	* Returns true if `key` is a valid key to use when extending objects.
	*
	* @param  {String} `key`
	* @return {Boolean}
	*/
	function isValidKey(key) {
		return key !== "__proto__" && key !== "constructor" && key !== "prototype";
	}
	/**
	* Expose `mixinDeep`
	*/
	module.exports = mixinDeep;
}));
//#endregion
//#region node_modules/get-value/index.js
var require_get_value = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/*!
	* get-value <https://github.com/jonschlinkert/get-value>
	*
	* Copyright (c) 2014-2015, Jon Schlinkert.
	* Licensed under the MIT License.
	*/
	module.exports = function(obj, prop, a, b, c) {
		if (!isObject(obj) || !prop) return obj;
		prop = toString(prop);
		if (a) prop += "." + toString(a);
		if (b) prop += "." + toString(b);
		if (c) prop += "." + toString(c);
		if (prop in obj) return obj[prop];
		var segs = prop.split(".");
		var len = segs.length;
		var i = -1;
		while (obj && ++i < len) {
			var key = segs[i];
			while (key[key.length - 1] === "\\") key = key.slice(0, -1) + "." + segs[++i];
			obj = obj[key];
		}
		return obj;
	};
	function isObject(val) {
		return val !== null && (typeof val === "object" || typeof val === "function");
	}
	function toString(val) {
		if (!val) return "";
		if (Array.isArray(val)) return val.join(".");
		return val;
	}
}));
//#endregion
//#region node_modules/assign-symbols/index.js
/*!
* assign-symbols <https://github.com/jonschlinkert/assign-symbols>
*
* Copyright (c) 2015, Jon Schlinkert.
* Licensed under the MIT License.
*/
var require_assign_symbols = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function(receiver, objects) {
		if (receiver === null || typeof receiver === "undefined") throw new TypeError("expected first argument to be an object.");
		if (typeof objects === "undefined" || typeof Symbol === "undefined") return receiver;
		if (typeof Object.getOwnPropertySymbols !== "function") return receiver;
		var isEnumerable = Object.prototype.propertyIsEnumerable;
		var target = Object(receiver);
		var len = arguments.length, i = 0;
		while (++i < len) {
			var provider = Object(arguments[i]);
			var names = Object.getOwnPropertySymbols(provider);
			for (var j = 0; j < names.length; j++) {
				var key = names[j];
				if (isEnumerable.call(provider, key)) target[key] = provider[key];
			}
		}
		return target;
	};
}));
//#endregion
//#region node_modules/split-string/node_modules/extend-shallow/index.js
var require_extend_shallow$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isExtendable = require_is_extendable$2();
	var assignSymbols = require_assign_symbols();
	module.exports = Object.assign || function(obj) {
		if (obj === null || typeof obj === "undefined") throw new TypeError("Cannot convert undefined or null to object");
		if (!isObject(obj)) obj = {};
		for (var i = 1; i < arguments.length; i++) {
			var val = arguments[i];
			if (isString(val)) val = toObject(val);
			if (isObject(val)) {
				assign(obj, val);
				assignSymbols(obj, val);
			}
		}
		return obj;
	};
	function assign(a, b) {
		for (var key in b) if (hasOwn(b, key)) a[key] = b[key];
	}
	function isString(val) {
		return val && typeof val === "string";
	}
	function toObject(str) {
		var obj = {};
		for (var i in str) obj[i] = str[i];
		return obj;
	}
	function isObject(val) {
		return val && typeof val === "object" || isExtendable(val);
	}
	/**
	* Returns true if the given `key` is an own property of `obj`.
	*/
	function hasOwn(obj, key) {
		return Object.prototype.hasOwnProperty.call(obj, key);
	}
}));
//#endregion
//#region node_modules/split-string/index.js
/*!
* split-string <https://github.com/jonschlinkert/split-string>
*
* Copyright (c) 2015-2017, Jon Schlinkert.
* Released under the MIT License.
*/
var require_split_string = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var extend = require_extend_shallow$1();
	module.exports = function(str, options, fn) {
		if (typeof str !== "string") throw new TypeError("expected a string");
		if (typeof options === "function") {
			fn = options;
			options = null;
		}
		if (typeof options === "string") options = { sep: options };
		var opts = extend({ sep: "." }, options);
		var quotes = opts.quotes || [
			"\"",
			"'",
			"`"
		];
		var brackets;
		if (opts.brackets === true) brackets = {
			"<": ">",
			"(": ")",
			"[": "]",
			"{": "}"
		};
		else if (opts.brackets) brackets = opts.brackets;
		var tokens = [];
		var stack = [];
		var arr = [""];
		var sep = opts.sep;
		var len = str.length;
		var idx = -1;
		var closeIdx;
		function expected() {
			if (brackets && stack.length) return brackets[stack[stack.length - 1]];
		}
		while (++idx < len) {
			var ch = str[idx];
			var next = str[idx + 1];
			var tok = {
				val: ch,
				idx,
				arr,
				str
			};
			tokens.push(tok);
			if (ch === "\\") {
				tok.val = keepEscaping(opts, str, idx) === true ? ch + next : next;
				tok.escaped = true;
				if (typeof fn === "function") fn(tok);
				arr[arr.length - 1] += tok.val;
				idx++;
				continue;
			}
			if (brackets && brackets[ch]) {
				stack.push(ch);
				var e = expected();
				var i = idx + 1;
				if (str.indexOf(e, i + 1) !== -1) while (stack.length && i < len) {
					var s = str[++i];
					if (s === "\\") {
						s++;
						continue;
					}
					if (quotes.indexOf(s) !== -1) {
						i = getClosingQuote(str, s, i + 1);
						continue;
					}
					e = expected();
					if (stack.length && str.indexOf(e, i + 1) === -1) break;
					if (brackets[s]) {
						stack.push(s);
						continue;
					}
					if (e === s) stack.pop();
				}
				closeIdx = i;
				if (closeIdx === -1) {
					arr[arr.length - 1] += ch;
					continue;
				}
				ch = str.slice(idx, closeIdx + 1);
				tok.val = ch;
				tok.idx = idx = closeIdx;
			}
			if (quotes.indexOf(ch) !== -1) {
				closeIdx = getClosingQuote(str, ch, idx + 1);
				if (closeIdx === -1) {
					arr[arr.length - 1] += ch;
					continue;
				}
				if (keepQuotes(ch, opts) === true) ch = str.slice(idx, closeIdx + 1);
				else ch = str.slice(idx + 1, closeIdx);
				tok.val = ch;
				tok.idx = idx = closeIdx;
			}
			if (typeof fn === "function") {
				fn(tok, tokens);
				ch = tok.val;
				idx = tok.idx;
			}
			if (tok.val === sep && tok.split !== false) {
				arr.push("");
				continue;
			}
			arr[arr.length - 1] += tok.val;
		}
		return arr;
	};
	function getClosingQuote(str, ch, i, brackets) {
		var idx = str.indexOf(ch, i);
		if (str.charAt(idx - 1) === "\\") return getClosingQuote(str, ch, idx + 1);
		return idx;
	}
	function keepQuotes(ch, opts) {
		if (opts.keepDoubleQuotes === true && ch === "\"") return true;
		if (opts.keepSingleQuotes === true && ch === "'") return true;
		return opts.keepQuotes;
	}
	function keepEscaping(opts, str, idx) {
		if (typeof opts.keepEscaping === "function") return opts.keepEscaping(str, idx);
		return opts.keepEscaping === true || str[idx + 1] === "\\";
	}
}));
//#endregion
//#region node_modules/extend-shallow/node_modules/is-extendable/index.js
/*!
* is-extendable <https://github.com/jonschlinkert/is-extendable>
*
* Copyright (c) 2015, Jon Schlinkert.
* Licensed under the MIT License.
*/
var require_is_extendable$1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function isExtendable(val) {
		return typeof val !== "undefined" && val !== null && (typeof val === "object" || typeof val === "function");
	};
}));
//#endregion
//#region node_modules/extend-shallow/index.js
var require_extend_shallow = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isObject = require_is_extendable$1();
	module.exports = function extend(o) {
		if (!isObject(o)) o = {};
		var len = arguments.length;
		for (var i = 1; i < len; i++) {
			var obj = arguments[i];
			if (isObject(obj)) assign(o, obj);
		}
		return o;
	};
	function assign(a, b) {
		for (var key in b) if (hasOwn(b, key)) a[key] = b[key];
	}
	/**
	* Returns true if the given `key` is an own property of `obj`.
	*/
	function hasOwn(obj, key) {
		return Object.prototype.hasOwnProperty.call(obj, key);
	}
}));
//#endregion
//#region node_modules/set-value/node_modules/is-plain-object/index.js
/*!
* is-plain-object <https://github.com/jonschlinkert/is-plain-object>
*
* Copyright (c) 2014-2017, Jon Schlinkert.
* Released under the MIT License.
*/
var require_is_plain_object = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isObject = require_isobject();
	function isObjectObject(o) {
		return isObject(o) === true && Object.prototype.toString.call(o) === "[object Object]";
	}
	module.exports = function isPlainObject(o) {
		var ctor, prot;
		if (isObjectObject(o) === false) return false;
		ctor = o.constructor;
		if (typeof ctor !== "function") return false;
		prot = ctor.prototype;
		if (isObjectObject(prot) === false) return false;
		if (prot.hasOwnProperty("isPrototypeOf") === false) return false;
		return true;
	};
}));
//#endregion
//#region node_modules/set-value/node_modules/is-extendable/index.js
/*!
* is-extendable <https://github.com/jonschlinkert/is-extendable>
*
* Copyright (c) 2015, Jon Schlinkert.
* Licensed under the MIT License.
*/
var require_is_extendable = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = function isExtendable(val) {
		return typeof val !== "undefined" && val !== null && (typeof val === "object" || typeof val === "function");
	};
}));
//#endregion
//#region node_modules/set-value/index.js
/*!
* set-value <https://github.com/jonschlinkert/set-value>
*
* Copyright (c) 2014-2015, 2017, Jon Schlinkert.
* Released under the MIT License.
*/
var require_set_value = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var split = require_split_string();
	var extend = require_extend_shallow();
	var isPlainObject = require_is_plain_object();
	var isObject = require_is_extendable();
	module.exports = function(obj, prop, val) {
		if (!isObject(obj)) return obj;
		if (Array.isArray(prop)) prop = [].concat.apply([], prop).join(".");
		if (typeof prop !== "string") return obj;
		var keys = split(prop, {
			sep: ".",
			brackets: true
		}).filter(isValidKey);
		var len = keys.length;
		var idx = -1;
		var current = obj;
		while (++idx < len) {
			var key = keys[idx];
			if (idx !== len - 1) {
				if (!isObject(current[key])) current[key] = {};
				current = current[key];
				continue;
			}
			if (isPlainObject(current[key]) && isPlainObject(val)) current[key] = extend({}, current[key], val);
			else current[key] = val;
		}
		return obj;
	};
	function isValidKey(key) {
		return key !== "__proto__" && key !== "constructor" && key !== "prototype";
	}
}));
//#endregion
//#region node_modules/merge-value/index.js
var require_merge_value = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var isObject = require_is_extendable$2();
	var merge = require_mixin_deep();
	var get = require_get_value();
	var set = require_set_value();
	module.exports = function mergeValue(obj, prop, value) {
		if (!isObject(obj)) throw new TypeError("expected an object");
		if (typeof prop !== "string" || value == null) return merge.apply(null, arguments);
		if (typeof value === "string") {
			set(obj, prop, value);
			return obj;
		}
		var current = get(obj, prop);
		if (isObject(value) && isObject(current)) value = merge({}, current, value);
		set(obj, prop, value);
		return obj;
	};
}));
require_client();
var import_merge_value = /* @__PURE__ */ __toESM(require_merge_value());
var join = (...args) => args.filter(Boolean).join(".");
function getKeyPath(path) {
	const dir = path.split(".");
	return [dir.pop(), dir.join(".") || void 0];
}
function useToggle(toggled) {
	const wrapperRef = (0, import_react.useRef)(null);
	const contentRef = (0, import_react.useRef)(null);
	const firstRender = (0, import_react.useRef)(true);
	(0, import_react.useLayoutEffect)(() => {
		if (!toggled) {
			wrapperRef.current.style.height = "0px";
			wrapperRef.current.style.overflow = "hidden";
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}
		let timeout;
		const ref = wrapperRef.current;
		const fixHeight = () => {
			if (toggled) {
				ref.style.removeProperty("height");
				ref.style.removeProperty("overflow");
				contentRef.current.scrollIntoView({
					behavior: "smooth",
					block: "nearest"
				});
			}
		};
		ref.addEventListener("transitionend", fixHeight, { once: true });
		const { height } = contentRef.current.getBoundingClientRect();
		ref.style.height = height + "px";
		if (!toggled) {
			ref.style.overflow = "hidden";
			timeout = window.setTimeout(() => ref.style.height = "0px", 50);
		}
		return () => {
			ref.removeEventListener("transitionend", fixHeight);
			clearTimeout(timeout);
		};
	}, [toggled]);
	return {
		wrapperRef,
		contentRef
	};
}
var useVisiblePaths = (store) => {
	const [paths, setPaths] = (0, import_react.useState)(store.getVisiblePaths());
	(0, import_react.useEffect)(() => {
		setPaths(store.getVisiblePaths());
		const unsub = store.useStore.subscribe(store.getVisiblePaths, setPaths, { equalityFn: shallow });
		return () => unsub();
	}, [store]);
	return paths;
};
function usePopin(margin = 3) {
	const popinRef = (0, import_react.useRef)(null);
	const wrapperRef = (0, import_react.useRef)(null);
	const [shown, setShow] = (0, import_react.useState)(false);
	const show = (0, import_react.useCallback)(() => setShow(true), []);
	const hide = (0, import_react.useCallback)(() => setShow(false), []);
	(0, import_react.useLayoutEffect)(() => {
		if (shown) {
			const { bottom, top, left } = popinRef.current.getBoundingClientRect();
			const { height } = wrapperRef.current.getBoundingClientRect();
			const direction = bottom + height > window.innerHeight - 40 ? "up" : "down";
			wrapperRef.current.style.position = "fixed";
			wrapperRef.current.style.zIndex = "10000";
			wrapperRef.current.style.left = left + "px";
			if (direction === "down") wrapperRef.current.style.top = bottom + margin + "px";
			else wrapperRef.current.style.bottom = window.innerHeight - top + margin + "px";
		}
	}, [margin, shown]);
	return {
		popinRef,
		wrapperRef,
		shown,
		show,
		hide
	};
}
D([e$1]);
var convertMap = {
	rgb: "toRgb",
	hsl: "toHsl",
	hsv: "toHsv",
	hex: "toHex"
};
v8n.extend({ color: () => (value) => A(value).isValid() });
var schema$2 = (o) => v8n().color().test(o);
function convert(color, { format, hasAlpha, isString }) {
	const result = color[convertMap[format] + (isString && format !== "hex" ? "String" : "")]();
	return typeof result === "object" && !hasAlpha ? omit(result, ["a"]) : result;
}
var sanitize$2 = (v, settings) => {
	const color = A(v);
	if (!color.isValid()) throw Error("Invalid color");
	return convert(color, settings);
};
var format$1 = (v, settings) => {
	return convert(A(v), _objectSpread2(_objectSpread2({}, settings), {}, {
		isString: true,
		format: "hex"
	}));
};
var normalize$3 = ({ value }) => {
	const _f = S$1(value);
	const settings = {
		format: _f === "name" ? "hex" : _f,
		hasAlpha: typeof value === "object" ? "a" in value : _f === "hex" && value.length === 8 || /^(rgba)|(hsla)|(hsva)/.test(value),
		isString: typeof value === "string"
	};
	return {
		value: sanitize$2(value, settings),
		settings
	};
};
var props$2 = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	schema: schema$2,
	sanitize: sanitize$2,
	format: format$1,
	normalize: normalize$3
});
var ColorPreview = styled("div", {
	position: "relative",
	boxSizing: "border-box",
	borderRadius: "$sm",
	overflow: "hidden",
	cursor: "pointer",
	height: "$rowHeight",
	width: "$rowHeight",
	backgroundColor: "#fff",
	backgroundImage: `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>')`,
	$inputStyle: "",
	$hover: "",
	zIndex: 1,
	variants: { active: { true: { $inputStyle: "$accent1" } } },
	"&::before": {
		content: "\"\"",
		position: "absolute",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: "currentColor",
		zIndex: 1
	}
});
var PickerContainer = styled("div", {
	position: "relative",
	display: "grid",
	gridTemplateColumns: "$sizes$rowHeight auto",
	columnGap: "$colGap",
	alignItems: "center"
});
var PickerWrapper = styled("div", {
	width: "$colorPickerWidth",
	height: "$colorPickerHeight",
	".react-colorful": {
		width: "100%",
		height: "100%",
		boxShadow: "$level2",
		cursor: "crosshair"
	},
	".react-colorful__saturation": { borderRadius: "$sm $sm 0 0" },
	".react-colorful__alpha, .react-colorful__hue": { height: 10 },
	".react-colorful__last-control": { borderRadius: "0 0 $sm $sm" },
	".react-colorful__pointer": {
		height: 12,
		width: 12
	}
});
function convertToRgb(value, format) {
	return format !== "rgb" ? A(value).toRgb() : value;
}
function Color({ value, displayValue, settings, onUpdate }) {
	const { emitOnEditStart, emitOnEditEnd } = useInputContext();
	const { format, hasAlpha } = settings;
	const { popinRef, wrapperRef, shown, show, hide } = usePopin();
	const timer = (0, import_react.useRef)(0);
	const [initialRgb, setInitialRgb] = (0, import_react.useState)(() => convertToRgb(value, format));
	const ColorPicker = hasAlpha ? Ce : Ne;
	const showPicker = () => {
		setInitialRgb(convertToRgb(value, format));
		show();
		emitOnEditStart();
	};
	const hidePicker = () => {
		hide();
		emitOnEditEnd();
		window.clearTimeout(timer.current);
	};
	const hideAfterDelay = () => {
		timer.current = window.setTimeout(hidePicker, 500);
	};
	(0, import_react.useEffect)(() => {
		return () => window.clearTimeout(timer.current);
	}, []);
	return import_react.createElement(import_react.Fragment, null, import_react.createElement(ColorPreview, {
		ref: popinRef,
		active: shown,
		onClick: () => showPicker(),
		style: { color: displayValue }
	}), shown && import_react.createElement(Portal, null, import_react.createElement(Overlay, { onPointerUp: hidePicker }), import_react.createElement(PickerWrapper, {
		ref: wrapperRef,
		onMouseEnter: () => window.clearTimeout(timer.current),
		onMouseLeave: (e) => e.buttons === 0 && hideAfterDelay()
	}, import_react.createElement(ColorPicker, {
		color: initialRgb,
		onChange: onUpdate
	}))));
}
function ColorComponent() {
	const { value, displayValue, label, onChange, onUpdate, settings } = useInputContext();
	return import_react.createElement(Row, { input: true }, import_react.createElement(Label$1, null, label), import_react.createElement(PickerContainer, null, import_react.createElement(Color, {
		value,
		displayValue,
		onChange,
		onUpdate,
		settings
	}), import_react.createElement(ValueInput, {
		value: displayValue,
		onChange,
		onUpdate
	})));
}
var color = createInternalPlugin(_objectSpread2({ component: ColorComponent }, props$2));
function Vector3dComponent() {
	const { label, displayValue, onUpdate, settings } = useInputContext();
	return import_react.createElement(Row, { input: true }, import_react.createElement(Label$1, null, label), import_react.createElement(Vector, {
		value: displayValue,
		settings,
		onUpdate
	}));
}
var vector3d = createInternalPlugin(_objectSpread2({ component: Vector3dComponent }, getVectorPlugin([
	"x",
	"y",
	"z"
])));
var JoystickTrigger = styled("div", {
	$flexCenter: "",
	position: "relative",
	backgroundColor: "$elevation3",
	borderRadius: "$sm",
	cursor: "pointer",
	height: "$rowHeight",
	width: "$rowHeight",
	touchAction: "none",
	$draggable: "",
	$hover: "",
	"&:active": { cursor: "none" },
	"&::after": {
		content: "\"\"",
		backgroundColor: "$accent2",
		height: 4,
		width: 4,
		borderRadius: 2
	}
});
var JoystickPlayground = styled("div", {
	$flexCenter: "",
	width: "$joystickWidth",
	height: "$joystickHeight",
	borderRadius: "$sm",
	boxShadow: "$level2",
	position: "fixed",
	zIndex: 1e4,
	overflow: "hidden",
	$draggable: "",
	transform: "translate(-50%, -50%)",
	variants: { isOutOfBounds: {
		true: { backgroundColor: "$elevation1" },
		false: { backgroundColor: "$elevation3" }
	} },
	"> div": {
		position: "absolute",
		$flexCenter: "",
		borderStyle: "solid",
		borderWidth: 1,
		borderColor: "$highlight1",
		backgroundColor: "$elevation3",
		width: "80%",
		height: "80%",
		"&::after,&::before": {
			content: "\"\"",
			position: "absolute",
			zindex: 10,
			backgroundColor: "$highlight1"
		},
		"&::before": {
			width: "100%",
			height: 1
		},
		"&::after": {
			height: "100%",
			width: 1
		}
	},
	"> span": {
		position: "relative",
		zindex: 100,
		width: 10,
		height: 10,
		backgroundColor: "$accent2",
		borderRadius: "50%"
	}
});
function Joystick({ value, settings, onUpdate }) {
	const timeout = (0, import_react.useRef)();
	const outOfBoundsX = (0, import_react.useRef)(0);
	const outOfBoundsY = (0, import_react.useRef)(0);
	const stepMultiplier = (0, import_react.useRef)(1);
	const [joystickShown, setShowJoystick] = (0, import_react.useState)(false);
	const [isOutOfBounds, setIsOutOfBounds] = (0, import_react.useState)(false);
	const [spanRef, set] = useTransform();
	const joystickeRef = (0, import_react.useRef)(null);
	const playgroundRef = (0, import_react.useRef)(null);
	(0, import_react.useLayoutEffect)(() => {
		if (joystickShown) {
			const { top, left, width, height } = joystickeRef.current.getBoundingClientRect();
			playgroundRef.current.style.left = left + width / 2 + "px";
			playgroundRef.current.style.top = top + height / 2 + "px";
		}
	}, [joystickShown]);
	const { keys: [v1, v2], joystick } = settings;
	const yFactor = joystick === "invertY" ? 1 : -1;
	const { [v1]: { step: stepV1 }, [v2]: { step: stepV2 } } = settings;
	const wpx = useTh("sizes", "joystickWidth");
	const hpx = useTh("sizes", "joystickHeight");
	const w = parseFloat(wpx) * .8 / 2;
	const h = parseFloat(hpx) * .8 / 2;
	const startOutOfBounds = (0, import_react.useCallback)(() => {
		if (timeout.current) return;
		setIsOutOfBounds(true);
		if (outOfBoundsX.current) set({ x: outOfBoundsX.current * w });
		if (outOfBoundsY.current) set({ y: outOfBoundsY.current * -h });
		timeout.current = window.setInterval(() => {
			onUpdate((v) => {
				const incX = stepV1 * outOfBoundsX.current * stepMultiplier.current;
				const incY = yFactor * stepV2 * outOfBoundsY.current * stepMultiplier.current;
				return Array.isArray(v) ? {
					[v1]: v[0] + incX,
					[v2]: v[1] + incY
				} : {
					[v1]: v[v1] + incX,
					[v2]: v[v2] + incY
				};
			});
		}, 16);
	}, [
		w,
		h,
		onUpdate,
		set,
		stepV1,
		stepV2,
		v1,
		v2,
		yFactor
	]);
	const endOutOfBounds = (0, import_react.useCallback)(() => {
		window.clearTimeout(timeout.current);
		timeout.current = void 0;
		setIsOutOfBounds(false);
	}, []);
	(0, import_react.useEffect)(() => {
		function setStepMultiplier(event) {
			stepMultiplier.current = multiplyStep(event);
		}
		window.addEventListener("keydown", setStepMultiplier);
		window.addEventListener("keyup", setStepMultiplier);
		return () => {
			window.clearTimeout(timeout.current);
			window.removeEventListener("keydown", setStepMultiplier);
			window.removeEventListener("keyup", setStepMultiplier);
		};
	}, []);
	const bind = useDrag(({ first, active, delta: [dx, dy], movement: [mx, my] }) => {
		if (first) setShowJoystick(true);
		const _x = clamp(mx, -w, w);
		const _y = clamp(my, -h, h);
		outOfBoundsX.current = Math.abs(mx) > Math.abs(_x) ? Math.sign(mx - _x) : 0;
		outOfBoundsY.current = Math.abs(my) > Math.abs(_y) ? Math.sign(_y - my) : 0;
		let newX = value[v1];
		let newY = value[v2];
		if (active) {
			if (!outOfBoundsX.current) {
				newX += dx * stepV1 * stepMultiplier.current;
				set({ x: _x });
			}
			if (!outOfBoundsY.current) {
				newY -= yFactor * dy * stepV2 * stepMultiplier.current;
				set({ y: _y });
			}
			if (outOfBoundsX.current || outOfBoundsY.current) startOutOfBounds();
			else endOutOfBounds();
			onUpdate({
				[v1]: newX,
				[v2]: newY
			});
		} else {
			setShowJoystick(false);
			outOfBoundsX.current = 0;
			outOfBoundsY.current = 0;
			set({
				x: 0,
				y: 0
			});
			endOutOfBounds();
		}
	});
	return import_react.createElement(JoystickTrigger, _extends({ ref: joystickeRef }, bind()), joystickShown && import_react.createElement(Portal, null, import_react.createElement(JoystickPlayground, {
		ref: playgroundRef,
		isOutOfBounds
	}, import_react.createElement("div", null), import_react.createElement("span", { ref: spanRef }))));
}
var Container$1 = styled("div", {
	display: "grid",
	columnGap: "$colGap",
	variants: { withJoystick: {
		true: { gridTemplateColumns: "$sizes$rowHeight auto" },
		false: { gridTemplateColumns: "auto" }
	} }
});
function Vector2dComponent() {
	const { label, displayValue, onUpdate, settings } = useInputContext();
	return import_react.createElement(Row, { input: true }, import_react.createElement(Label$1, null, label), import_react.createElement(Container$1, { withJoystick: !!settings.joystick }, settings.joystick && import_react.createElement(Joystick, {
		value: displayValue,
		settings,
		onUpdate
	}), import_react.createElement(Vector, {
		value: displayValue,
		settings,
		onUpdate
	})));
}
var _excluded$7 = ["joystick"];
var plugin = getVectorPlugin(["x", "y"]);
var normalize$2 = (_ref) => {
	let { joystick = true } = _ref, input = _objectWithoutProperties$1(_ref, _excluded$7);
	const { value, settings } = plugin.normalize(input);
	return {
		value,
		settings: _objectSpread2(_objectSpread2({}, settings), {}, { joystick })
	};
};
var vector2d = createInternalPlugin(_objectSpread2(_objectSpread2({ component: Vector2dComponent }, plugin), {}, { normalize: normalize$2 }));
var sanitize$1 = (v) => {
	if (v === void 0) return void 0;
	if (v instanceof File) try {
		return URL.createObjectURL(v);
	} catch (e) {
		return;
	}
	if (typeof v === "string" && v.indexOf("blob:") === 0) return v;
	throw Error(`Invalid image format [undefined | blob | File].`);
};
var schema$1 = (_o, s) => typeof s === "object" && "image" in s;
var normalize$1 = ({ image }) => {
	return { value: image };
};
var props$1 = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	sanitize: sanitize$1,
	schema: schema$1,
	normalize: normalize$1
});
var ImageContainer = styled("div", {
	position: "relative",
	display: "grid",
	gridTemplateColumns: "$sizes$rowHeight auto 20px",
	columnGap: "$colGap",
	alignItems: "center"
});
var DropZone = styled("div", {
	$flexCenter: "",
	overflow: "hidden",
	height: "$rowHeight",
	background: "$elevation3",
	textAlign: "center",
	color: "inherit",
	borderRadius: "$sm",
	outline: "none",
	userSelect: "none",
	cursor: "pointer",
	$inputStyle: "",
	$hover: "",
	$focusWithin: "",
	$active: "$accent1 $elevation1",
	variants: { isDragAccept: { true: {
		$inputStyle: "$accent1",
		backgroundColor: "$elevation1"
	} } }
});
var ImagePreview = styled("div", {
	boxSizing: "border-box",
	borderRadius: "$sm",
	height: "$rowHeight",
	width: "$rowHeight",
	$inputStyle: "",
	backgroundSize: "cover",
	backgroundPosition: "center",
	variants: { hasImage: { true: {
		cursor: "pointer",
		$hover: "",
		$active: ""
	} } }
});
var ImageLargePreview = styled("div", {
	$flexCenter: "",
	width: "$imagePreviewWidth",
	height: "$imagePreviewHeight",
	borderRadius: "$sm",
	boxShadow: "$level2",
	pointerEvents: "none",
	$inputStyle: "",
	backgroundSize: "cover",
	backgroundPosition: "center"
});
var Instructions = styled("div", {
	fontSize: "0.8em",
	height: "100%",
	padding: "$rowGap $md"
});
var Remove = styled("div", {
	$flexCenter: "",
	top: "0",
	right: "0",
	marginRight: "$sm",
	height: "100%",
	cursor: "pointer",
	variants: { disabled: { true: {
		color: "$elevation3",
		cursor: "default"
	} } },
	"&::after,&::before": {
		content: "\"\"",
		position: "absolute",
		height: 2,
		width: 10,
		borderRadius: 1,
		backgroundColor: "currentColor"
	},
	"&::after": { transform: "rotate(45deg)" },
	"&::before": { transform: "rotate(-45deg)" }
});
function ImageComponent() {
	const { label, value, onUpdate, disabled } = useInputContext();
	const { popinRef, wrapperRef, shown, show, hide } = usePopin();
	const onDrop = (0, import_react.useCallback)((acceptedFiles) => {
		if (acceptedFiles.length) onUpdate(acceptedFiles[0]);
	}, [onUpdate]);
	const clear = (0, import_react.useCallback)((e) => {
		e.stopPropagation();
		onUpdate(void 0);
	}, [onUpdate]);
	const { getRootProps, getInputProps, isDragAccept } = useDropzone({
		maxFiles: 1,
		accept: "image/*",
		onDrop,
		disabled
	});
	return import_react.createElement(Row, { input: true }, import_react.createElement(Label$1, null, label), import_react.createElement(ImageContainer, null, import_react.createElement(ImagePreview, {
		ref: popinRef,
		hasImage: !!value,
		onPointerDown: () => !!value && show(),
		onPointerUp: hide,
		style: { backgroundImage: value ? `url(${value})` : "none" }
	}), shown && !!value && import_react.createElement(Portal, null, import_react.createElement(Overlay, {
		onPointerUp: hide,
		style: { cursor: "pointer" }
	}), import_react.createElement(ImageLargePreview, {
		ref: wrapperRef,
		style: { backgroundImage: `url(${value})` }
	})), import_react.createElement(DropZone, getRootProps({ isDragAccept }), import_react.createElement("input", getInputProps()), import_react.createElement(Instructions, null, isDragAccept ? "drop image" : "click or drop")), import_react.createElement(Remove, {
		onClick: clear,
		disabled: !value
	})));
}
var image = createInternalPlugin(_objectSpread2({ component: ImageComponent }, props$1));
var number = v8n().number();
var schema = (o, s) => v8n().array().length(2).every.number().test(o) && v8n().schema({
	min: number,
	max: number
}).test(s);
var format = (v) => ({
	min: v[0],
	max: v[1]
});
var sanitize = (value, { bounds: [MIN, MAX] }, prevValue) => {
	const _value = Array.isArray(value) ? format(value) : value;
	const { min, max } = _objectSpread2(_objectSpread2({}, {
		min: prevValue[0],
		max: prevValue[1]
	}), _value);
	return [clamp(Number(min), MIN, Math.max(MIN, max)), clamp(Number(max), Math.min(MAX, min), MAX)];
};
var normalize = ({ value, min, max }) => {
	const boundsSettings = {
		min,
		max
	};
	const _settings = normalizeKeyedNumberSettings(format(value), {
		min: boundsSettings,
		max: boundsSettings
	});
	const bounds = [min, max];
	const settings = _objectSpread2(_objectSpread2({}, _settings), {}, { bounds });
	return {
		value: sanitize(format(value), settings, value),
		settings
	};
};
var props = /*#__PURE__*/ Object.freeze({
	__proto__: null,
	schema,
	format,
	sanitize,
	normalize
});
var _excluded$6 = [
	"value",
	"bounds",
	"onDrag"
];
var _excluded2$1 = ["bounds"];
var Container = styled("div", {
	display: "grid",
	columnGap: "$colGap",
	gridTemplateColumns: "auto calc($sizes$numberInputMinWidth * 2 + $space$rowGap)"
});
function IntervalSlider(_ref) {
	let { value, bounds: [min, max], onDrag } = _ref, settings = _objectWithoutProperties$1(_ref, _excluded$6);
	const ref = (0, import_react.useRef)(null);
	const minScrubberRef = (0, import_react.useRef)(null);
	const maxScrubberRef = (0, import_react.useRef)(null);
	const rangeWidth = (0, import_react.useRef)(0);
	const scrubberWidth = useTh("sizes", "scrubberWidth");
	const bind = useDrag(({ event, first, xy: [x], movement: [mx], memo: _memo = {} }) => {
		if (first) {
			const { width, left } = ref.current.getBoundingClientRect();
			rangeWidth.current = width - parseFloat(scrubberWidth);
			const targetIsScrub = (event === null || event === void 0 ? void 0 : event.target) === minScrubberRef.current || (event === null || event === void 0 ? void 0 : event.target) === maxScrubberRef.current;
			_memo.pos = invertedRange((x - left) / width, min, max);
			const delta = Math.abs(_memo.pos - value.min) - Math.abs(_memo.pos - value.max);
			_memo.key = delta < 0 || delta === 0 && _memo.pos <= value.min ? "min" : "max";
			if (targetIsScrub) _memo.pos = value[_memo.key];
		}
		const newValue = _memo.pos + invertedRange(mx / rangeWidth.current, 0, max - min);
		onDrag({ [_memo.key]: sanitizeStep(newValue, settings[_memo.key]) });
		return _memo;
	});
	const minStyle = `calc(${range(value.min, min, max)} * (100% - ${scrubberWidth} - 8px) + 4px)`;
	const maxStyle = `calc(${1 - range(value.max, min, max)} * (100% - ${scrubberWidth} - 8px) + 4px)`;
	return import_react.createElement(RangeWrapper, _extends({ ref }, bind()), import_react.createElement(Range, null, import_react.createElement(Indicator, { style: {
		left: minStyle,
		right: maxStyle
	} })), import_react.createElement(Scrubber, {
		position: "left",
		ref: minScrubberRef,
		style: { left: minStyle }
	}), import_react.createElement(Scrubber, {
		position: "right",
		ref: maxScrubberRef,
		style: { right: maxStyle }
	}));
}
function IntervalComponent() {
	const { label, displayValue, onUpdate, settings } = useInputContext();
	const _settings = _objectWithoutProperties$1(settings, _excluded2$1);
	return import_react.createElement(import_react.Fragment, null, import_react.createElement(Row, { input: true }, import_react.createElement(Label$1, null, label), import_react.createElement(Container, null, import_react.createElement(IntervalSlider, _extends({ value: displayValue }, settings, { onDrag: onUpdate })), import_react.createElement(Vector, {
		value: displayValue,
		settings: _settings,
		onUpdate,
		innerLabelTrim: 0
	}))));
}
var interval = createInternalPlugin(_objectSpread2({ component: IntervalComponent }, props));
var createEventEmitter = () => {
	const listenerMapping = /* @__PURE__ */ new Map();
	return {
		on: (topic, listener) => {
			let listeners = listenerMapping.get(topic);
			if (listeners === void 0) {
				listeners = /* @__PURE__ */ new Set();
				listenerMapping.set(topic, listeners);
			}
			listeners.add(listener);
		},
		off: (topic, listener) => {
			const listeners = listenerMapping.get(topic);
			if (listeners === void 0) return;
			listeners.delete(listener);
			if (listeners.size === 0) listenerMapping.delete(topic);
		},
		emit: (topic, ...args) => {
			const listeners = listenerMapping.get(topic);
			if (listeners === void 0) return;
			for (const listener of listeners) listener(...args);
		}
	};
};
var _excluded$5 = ["type", "value"];
var _excluded2 = [
	"onChange",
	"transient",
	"onEditStart",
	"onEditEnd"
];
new function Store() {
	const store = create(subscribeWithSelector(() => ({ data: {} })));
	const eventEmitter = createEventEmitter();
	this.storeId = getUid();
	this.useStore = store;
	const folders = {};
	const orderedPaths = /* @__PURE__ */ new Set();
	this.getVisiblePaths = () => {
		const data = this.getData();
		const paths = Object.keys(data);
		const hiddenFolders = [];
		Object.entries(folders).forEach(([path, settings]) => {
			if (settings.render && paths.some((p) => p.indexOf(path) === 0) && !settings.render(this.get)) hiddenFolders.push(path + ".");
		});
		const visiblePaths = [];
		orderedPaths.forEach((path) => {
			if (path in data && data[path].__refCount > 0 && hiddenFolders.every((p) => path.indexOf(p) === -1) && (!data[path].render || data[path].render(this.get))) visiblePaths.push(path);
		});
		return visiblePaths;
	};
	this.setOrderedPaths = (newPaths) => {
		newPaths.forEach((p) => orderedPaths.add(p));
	};
	this.orderPaths = (paths) => {
		this.setOrderedPaths(paths);
		return paths;
	};
	this.disposePaths = (paths) => {
		store.setState((s) => {
			const data = s.data;
			paths.forEach((path) => {
				if (path in data) {
					const input = data[path];
					input.__refCount--;
					if (input.__refCount === 0 && input.type in SpecialInputs) delete data[path];
				}
			});
			return { data };
		});
	};
	this.dispose = () => {
		store.setState(() => {
			return { data: {} };
		});
	};
	this.getFolderSettings = (path) => {
		return folders[path] || {};
	};
	this.getData = () => {
		return store.getState().data;
	};
	this.addData = (newData, override) => {
		store.setState((s) => {
			const data = s.data;
			Object.entries(newData).forEach(([path, newInputData]) => {
				let input = data[path];
				if (!!input) {
					const { type, value } = newInputData, rest = _objectWithoutProperties$1(newInputData, _excluded$5);
					if (type !== input.type) warn(LevaErrors.INPUT_TYPE_OVERRIDE, path, input.type, type);
					else {
						if (input.__refCount === 0 || override) Object.assign(input, rest);
						input.__refCount++;
					}
				} else data[path] = _objectSpread2(_objectSpread2({}, newInputData), {}, { __refCount: 1 });
			});
			return { data };
		});
	};
	this.setValueAtPath = (path, value, fromPanel) => {
		store.setState((s) => {
			const data = s.data;
			updateInput(data[path], value, path, this, fromPanel);
			return { data };
		});
	};
	this.setSettingsAtPath = (path, settings) => {
		store.setState((s) => {
			const data = s.data;
			data[path].settings = _objectSpread2(_objectSpread2({}, data[path].settings), settings);
			return { data };
		});
	};
	this.disableInputAtPath = (path, flag) => {
		store.setState((s) => {
			const data = s.data;
			data[path].disabled = flag;
			return { data };
		});
	};
	this.set = (values, fromPanel) => {
		store.setState((s) => {
			const data = s.data;
			Object.entries(values).forEach(([path, value]) => {
				try {
					updateInput(data[path], value, void 0, void 0, fromPanel);
				} catch (e) {}
			});
			return { data };
		});
	};
	this.getInput = (path) => {
		try {
			return this.getData()[path];
		} catch (e) {
			warn(LevaErrors.PATH_DOESNT_EXIST, path);
		}
	};
	this.get = (path) => {
		var _this$getInput;
		return (_this$getInput = this.getInput(path)) === null || _this$getInput === void 0 ? void 0 : _this$getInput.value;
	};
	this.emitOnEditStart = (path) => {
		eventEmitter.emit(`onEditStart:${path}`, this.get(path), path, _objectSpread2(_objectSpread2({}, this.getInput(path)), {}, { get: this.get }));
	};
	this.emitOnEditEnd = (path) => {
		eventEmitter.emit(`onEditEnd:${path}`, this.get(path), path, _objectSpread2(_objectSpread2({}, this.getInput(path)), {}, { get: this.get }));
	};
	this.subscribeToEditStart = (path, listener) => {
		const _path = `onEditStart:${path}`;
		eventEmitter.on(_path, listener);
		return () => eventEmitter.off(_path, listener);
	};
	this.subscribeToEditEnd = (path, listener) => {
		const _path = `onEditEnd:${path}`;
		eventEmitter.on(_path, listener);
		return () => eventEmitter.off(_path, listener);
	};
	const _getDataFromSchema = (schema, rootPath, mappedPaths) => {
		const data = {};
		Object.entries(schema).forEach(([key, rawInput]) => {
			if (key === "") return warn(LevaErrors.EMPTY_KEY);
			let newPath = join(rootPath, key);
			if (rawInput.type === SpecialInputs.FOLDER) {
				const newData = _getDataFromSchema(rawInput.schema, newPath, mappedPaths);
				Object.assign(data, newData);
				if (!(newPath in folders)) folders[newPath] = rawInput.settings;
			} else if (key in mappedPaths) warn(LevaErrors.DUPLICATE_KEYS, key, newPath, mappedPaths[key].path);
			else {
				const normalizedInput = normalizeInput(rawInput, key, newPath, data);
				if (normalizedInput) {
					const { type, options, input } = normalizedInput;
					const { onChange, transient, onEditStart, onEditEnd } = options, _options = _objectWithoutProperties$1(options, _excluded2);
					data[newPath] = _objectSpread2(_objectSpread2(_objectSpread2({ type }, _options), input), {}, { fromPanel: true });
					mappedPaths[key] = {
						path: newPath,
						onChange,
						transient,
						onEditStart,
						onEditEnd
					};
				} else warn(LevaErrors.UNKNOWN_INPUT, newPath, rawInput);
			}
		});
		return data;
	};
	this.getDataFromSchema = (schema) => {
		const mappedPaths = {};
		return [_getDataFromSchema(schema, "", mappedPaths), mappedPaths];
	};
}();
var isInput = (v) => "__levaInput" in v;
var buildTree = (paths, filter) => {
	const tree = {};
	const _filter = filter ? filter.toLowerCase() : null;
	paths.forEach((path) => {
		const [valueKey, folderPath] = getKeyPath(path);
		if (!_filter || valueKey.toLowerCase().indexOf(_filter) > -1) (0, import_merge_value.default)(tree, folderPath, { [valueKey]: {
			__levaInput: true,
			path
		} });
	});
	return tree;
};
var _excluded$4 = [
	"type",
	"label",
	"path",
	"valueKey",
	"value",
	"settings",
	"setValue",
	"disabled"
];
function ControlInput(_ref) {
	let { type, label, path, valueKey, value, settings, setValue, disabled } = _ref, rest = _objectWithoutProperties$1(_ref, _excluded$4);
	const { displayValue, onChange, onUpdate } = useInputSetters({
		type,
		value,
		settings,
		setValue
	});
	const Input = Plugins[type].component;
	if (!Input) {
		warn(LevaErrors.NO_COMPONENT_FOR_TYPE, type, path);
		return null;
	}
	return import_react.createElement(InputContext.Provider, { value: _objectSpread2({
		key: valueKey,
		path,
		id: "" + path,
		label,
		displayValue,
		value,
		onChange,
		onUpdate,
		settings,
		setValue,
		disabled
	}, rest) }, import_react.createElement(StyledInputWrapper$1, { disabled }, import_react.createElement(Input, null)));
}
var StyledButton = styled("button", {
	display: "block",
	$reset: "",
	fontWeight: "$button",
	height: "$rowHeight",
	borderStyle: "none",
	borderRadius: "$sm",
	backgroundColor: "$elevation1",
	color: "$highlight1",
	"&:not(:disabled)": {
		color: "$highlight3",
		backgroundColor: "$accent2",
		cursor: "pointer",
		$hover: "$accent3",
		$active: "$accent3 $accent1",
		$focus: ""
	}
});
function Button({ onClick, settings, label }) {
	const store = useStoreContext();
	return import_react.createElement(Row, null, import_react.createElement(StyledButton, {
		disabled: settings.disabled,
		onClick: () => onClick(store.get)
	}, label));
}
var StyledButtonGroup = styled("div", {
	$flex: "",
	justifyContent: "flex-end",
	gap: "$colGap"
});
var StyledButtonGroupButton = styled("button", {
	$reset: "",
	cursor: "pointer",
	borderRadius: "$xs",
	"&:hover": { backgroundColor: "$elevation3" }
});
var getOpts = ({ label: _label, opts: _opts }) => {
	let label = typeof _label === "string" ? _label.trim() === "" ? null : _label : _label;
	let opts = _opts;
	if (typeof _opts.opts === "object") {
		if (opts.label !== void 0) label = _opts.label;
		opts = _opts.opts;
	}
	return {
		label,
		opts
	};
};
function ButtonGroup(props) {
	const { label, opts } = getOpts(props);
	const store = useStoreContext();
	return import_react.createElement(Row, { input: !!label }, label && import_react.createElement(Label$1, null, label), import_react.createElement(StyledButtonGroup, null, Object.entries(opts).map(([label, onClick]) => import_react.createElement(StyledButtonGroupButton, {
		key: label,
		onClick: () => onClick(store.get)
	}, label))));
}
var Canvas = styled("canvas", {
	height: "$monitorHeight",
	width: "100%",
	display: "block",
	borderRadius: "$sm"
});
var POINTS = 100;
function push(arr, val) {
	arr.push(val);
	if (arr.length > POINTS) arr.shift();
}
var MonitorCanvas = (0, import_react.forwardRef)(function({ initialValue }, ref) {
	const accentColor = useTh("colors", "highlight3");
	const backgroundColor = useTh("colors", "elevation2");
	const fillColor = useTh("colors", "highlight1");
	const [gradientTop, gradientBottom] = (0, import_react.useMemo)(() => {
		return [A(fillColor).alpha(.4).toRgbString(), A(fillColor).alpha(.1).toRgbString()];
	}, [fillColor]);
	const points = (0, import_react.useRef)([initialValue]);
	const min = (0, import_react.useRef)(initialValue);
	const max = (0, import_react.useRef)(initialValue);
	const raf = (0, import_react.useRef)();
	const drawPlot = (0, import_react.useCallback)((_canvas, _ctx) => {
		if (!_canvas) return;
		const { width, height } = _canvas;
		const path = new Path2D();
		const interval = width / POINTS;
		const verticalPadding = height * .05;
		for (let i = 0; i < points.current.length; i++) {
			const p = range(points.current[i], min.current, max.current);
			const x = interval * i;
			const y = height - p * (height - verticalPadding * 2) - verticalPadding;
			path.lineTo(x, y);
		}
		_ctx.clearRect(0, 0, width, height);
		const gradientPath = new Path2D(path);
		gradientPath.lineTo(interval * (points.current.length + 1), height);
		gradientPath.lineTo(0, height);
		gradientPath.lineTo(0, 0);
		const gradient = _ctx.createLinearGradient(0, 0, 0, height);
		gradient.addColorStop(0, gradientTop);
		gradient.addColorStop(1, gradientBottom);
		_ctx.fillStyle = gradient;
		_ctx.fill(gradientPath);
		_ctx.strokeStyle = backgroundColor;
		_ctx.lineJoin = "round";
		_ctx.lineWidth = 14;
		_ctx.stroke(path);
		_ctx.strokeStyle = accentColor;
		_ctx.lineWidth = 2;
		_ctx.stroke(path);
	}, [
		accentColor,
		backgroundColor,
		gradientTop,
		gradientBottom
	]);
	const [canvas, ctx] = useCanvas2d(drawPlot);
	(0, import_react.useImperativeHandle)(ref, () => ({ frame: (val) => {
		if (min.current === void 0 || val < min.current) min.current = val;
		if (max.current === void 0 || val > max.current) max.current = val;
		push(points.current, val);
		raf.current = requestAnimationFrame(() => drawPlot(canvas.current, ctx.current));
	} }), [
		canvas,
		ctx,
		drawPlot
	]);
	(0, import_react.useEffect)(() => () => cancelAnimationFrame(raf.current), []);
	return import_react.createElement(Canvas, { ref: canvas });
});
var parse = (val) => Number.isFinite(val) ? val.toPrecision(2) : val.toString();
var MonitorLog = (0, import_react.forwardRef)(function({ initialValue }, ref) {
	const [val, set] = (0, import_react.useState)(parse(initialValue));
	(0, import_react.useImperativeHandle)(ref, () => ({ frame: (v) => set(parse(v)) }), []);
	return import_react.createElement("div", null, val);
});
function getValue(o) {
	return typeof o === "function" ? o() : o.current;
}
function Monitor({ label, objectOrFn, settings }) {
	const ref = (0, import_react.useRef)();
	const initialValue = (0, import_react.useRef)(getValue(objectOrFn));
	(0, import_react.useEffect)(() => {
		const timeout = window.setInterval(() => {
			var _ref$current;
			if (document.hidden) return;
			(_ref$current = ref.current) === null || _ref$current === void 0 || _ref$current.frame(getValue(objectOrFn));
		}, settings.interval);
		return () => window.clearInterval(timeout);
	}, [objectOrFn, settings.interval]);
	return import_react.createElement(Row, { input: true }, import_react.createElement(Label$1, { align: "top" }, label), settings.graph ? import_react.createElement(MonitorCanvas, {
		ref,
		initialValue: initialValue.current
	}) : import_react.createElement(MonitorLog, {
		ref,
		initialValue: initialValue.current
	}));
}
var _excluded$3 = [
	"type",
	"label",
	"key"
];
var specialComponents = {
	[SpecialInputs.BUTTON]: Button,
	[SpecialInputs.BUTTON_GROUP]: ButtonGroup,
	[SpecialInputs.MONITOR]: Monitor
};
var Control = import_react.memo(({ path }) => {
	const [input, { set, setSettings, disable, storeId, emitOnEditStart, emitOnEditEnd }] = useInput(path);
	if (!input) return null;
	const { type, label, key } = input, inputProps = _objectWithoutProperties$1(input, _excluded$3);
	if (type in SpecialInputs) {
		const SpecialInputForType = specialComponents[type];
		return import_react.createElement(SpecialInputForType, _extends({
			label,
			path
		}, inputProps));
	}
	if (!(type in Plugins)) {
		log(LevaErrors.UNSUPPORTED_INPUT, type, path);
		return null;
	}
	return import_react.createElement(ControlInput, _extends({
		key: storeId + path,
		type,
		label,
		storeId,
		path,
		valueKey: key,
		setValue: set,
		setSettings,
		disable,
		emitOnEditStart,
		emitOnEditEnd
	}, inputProps));
});
function FolderTitle({ toggle, toggled, name }) {
	return import_react.createElement(StyledTitle, { onClick: () => toggle() }, import_react.createElement(Chevron, { toggled }), import_react.createElement("div", null, name));
}
var Folder = ({ name, path, tree }) => {
	const store = useStoreContext();
	const newPath = join(path, name);
	const { collapsed, color } = store.getFolderSettings(newPath);
	const [toggled, setToggle] = (0, import_react.useState)(!collapsed);
	const folderRef = (0, import_react.useRef)(null);
	const widgetColor = useTh("colors", "folderWidgetColor");
	const textColor = useTh("colors", "folderTextColor");
	(0, import_react.useLayoutEffect)(() => {
		folderRef.current.style.setProperty("--leva-colors-folderWidgetColor", color || widgetColor);
		folderRef.current.style.setProperty("--leva-colors-folderTextColor", color || textColor);
	}, [
		color,
		widgetColor,
		textColor
	]);
	return import_react.createElement(StyledFolder, { ref: folderRef }, import_react.createElement(FolderTitle, {
		name,
		toggled,
		toggle: () => setToggle((t) => !t)
	}), import_react.createElement(TreeWrapper, {
		parent: newPath,
		tree,
		toggled
	}));
};
var TreeWrapper = import_react.memo(({ isRoot: _isRoot = false, fill: _fill = false, flat: _flat = false, parent, tree, toggled }) => {
	const { wrapperRef, contentRef } = useToggle(toggled);
	const store = useStoreContext();
	const getOrder = ([key, o]) => {
		var _store$getInput;
		return (isInput(o) ? (_store$getInput = store.getInput(o.path)) === null || _store$getInput === void 0 ? void 0 : _store$getInput.order : store.getFolderSettings(join(parent, key)).order) || 0;
	};
	const entries = Object.entries(tree).sort((a, b) => getOrder(a) - getOrder(b));
	return import_react.createElement(StyledWrapper, {
		ref: wrapperRef,
		isRoot: _isRoot,
		fill: _fill,
		flat: _flat
	}, import_react.createElement(StyledContent, {
		ref: contentRef,
		isRoot: _isRoot,
		toggled
	}, entries.map(([key, value]) => isInput(value) ? import_react.createElement(Control, {
		key: value.path,
		valueKey: value.valueKey,
		path: value.path
	}) : import_react.createElement(Folder, {
		key,
		name: key,
		path: parent,
		tree: value
	}))));
});
var StyledRoot = styled("div", {
	position: "relative",
	fontFamily: "$mono",
	fontSize: "$root",
	color: "$rootText",
	backgroundColor: "$elevation1",
	variants: {
		fill: {
			false: {
				position: "fixed",
				top: "10px",
				right: "10px",
				zIndex: 1e3,
				width: "$rootWidth"
			},
			true: {
				position: "relative",
				width: "100%"
			}
		},
		flat: { false: {
			borderRadius: "$lg",
			boxShadow: "$level1"
		} },
		oneLineLabels: { true: { [`${StyledInputRow}`]: {
			gridTemplateColumns: "auto",
			gridAutoColumns: "minmax(max-content, 1fr)",
			gridAutoRows: "minmax($sizes$rowHeight), auto)",
			rowGap: 0,
			columnGap: 0,
			marginTop: "$rowGap"
		} } },
		hideTitleBar: {
			true: { $$titleBarHeight: "0px" },
			false: { $$titleBarHeight: "$sizes$titleBarHeight" }
		}
	},
	"&,*,*:after,*:before": { boxSizing: "border-box" },
	"*::selection": { backgroundColor: "$accent2" }
});
var iconWidth = 40;
var Icon = styled("i", {
	$flexCenter: "",
	width: iconWidth,
	userSelect: "none",
	cursor: "pointer",
	"> svg": {
		fill: "$highlight1",
		transition: "transform 350ms ease, fill 250ms ease"
	},
	"&:hover > svg": { fill: "$highlight3" },
	variants: { active: { true: { "> svg": { fill: "$highlight2" } } } }
});
var StyledTitleWithFilter = styled("div", {
	display: "flex",
	alignItems: "stretch",
	justifyContent: "space-between",
	height: "$titleBarHeight",
	variants: { mode: { drag: { cursor: "grab" } } }
});
var FilterWrapper = styled("div", {
	$flex: "",
	position: "relative",
	width: "100%",
	overflow: "hidden",
	transition: "height 250ms ease",
	color: "$highlight3",
	paddingLeft: "$md",
	[`> ${Icon}`]: { height: 30 },
	variants: { toggled: {
		true: { height: 30 },
		false: { height: 0 }
	} }
});
var StyledFilterInput = styled("input", {
	$reset: "",
	flex: 1,
	position: "relative",
	height: 30,
	width: "100%",
	backgroundColor: "transparent",
	fontSize: "10px",
	borderRadius: "$root",
	"&:focus": {},
	"&::placeholder": { color: "$highlight2" }
});
var TitleContainer = styled("div", {
	touchAction: "none",
	$flexCenter: "",
	flex: 1,
	"> svg": { fill: "$highlight1" },
	color: "$highlight1",
	variants: {
		drag: { true: {
			$draggable: "",
			"> svg": { transition: "fill 250ms ease" },
			"&:hover": { color: "$highlight3" },
			"&:hover > svg": { fill: "$highlight3" }
		} },
		filterEnabled: { false: { paddingRight: iconWidth } }
	}
});
var FilterInput = import_react.forwardRef(({ setFilter, toggle }, ref) => {
	const [value, set] = (0, import_react.useState)("");
	const debouncedOnChange = (0, import_react.useMemo)(() => debounce(setFilter, 250), [setFilter]);
	const clear = () => {
		setFilter("");
		set("");
	};
	const _onChange = (e) => {
		const v = e.currentTarget.value;
		toggle(true);
		set(v);
	};
	(0, import_react.useEffect)(() => {
		debouncedOnChange(value);
	}, [value, debouncedOnChange]);
	return import_react.createElement(import_react.Fragment, null, import_react.createElement(StyledFilterInput, {
		ref,
		value,
		placeholder: "[Open filter with CMD+SHIFT+L]",
		onPointerDown: (e) => e.stopPropagation(),
		onChange: _onChange
	}), import_react.createElement(Icon, {
		onClick: () => clear(),
		style: { visibility: value ? "visible" : "hidden" }
	}, import_react.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		height: "14",
		width: "14",
		viewBox: "0 0 20 20",
		fill: "currentColor"
	}, import_react.createElement("path", {
		fillRule: "evenodd",
		d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
		clipRule: "evenodd"
	}))));
});
function TitleWithFilter({ setFilter, onDrag, onDragStart, onDragEnd, toggle, toggled, title, drag, filterEnabled, from }) {
	const [filterShown, setShowFilter] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		var _inputRef$current, _inputRef$current2;
		if (filterShown) (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 || _inputRef$current.focus();
		else (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 || _inputRef$current2.blur();
	}, [filterShown]);
	const bind = useDrag(({ offset: [x, y], first, last }) => {
		onDrag({
			x,
			y
		});
		if (first) onDragStart({
			x,
			y
		});
		if (last) onDragEnd({
			x,
			y
		});
	}, {
		filterTaps: true,
		from: ({ offset: [x, y] }) => [(from === null || from === void 0 ? void 0 : from.x) || x, (from === null || from === void 0 ? void 0 : from.y) || y]
	});
	(0, import_react.useEffect)(() => {
		const handleShortcut = (event) => {
			if (event.key === "L" && event.shiftKey && event.metaKey) setShowFilter((f) => !f);
		};
		window.addEventListener("keydown", handleShortcut);
		return () => window.removeEventListener("keydown", handleShortcut);
	}, []);
	return import_react.createElement(import_react.Fragment, null, import_react.createElement(StyledTitleWithFilter, { mode: drag ? "drag" : void 0 }, import_react.createElement(Icon, {
		active: !toggled,
		onClick: () => toggle()
	}, import_react.createElement(Chevron, {
		toggled,
		width: 12,
		height: 8
	})), import_react.createElement(TitleContainer, _extends({}, drag ? bind() : {}, {
		drag,
		filterEnabled
	}), title === void 0 && drag ? import_react.createElement("svg", {
		width: "20",
		height: "10",
		viewBox: "0 0 28 14",
		xmlns: "http://www.w3.org/2000/svg"
	}, import_react.createElement("circle", {
		cx: "2",
		cy: "2",
		r: "2"
	}), import_react.createElement("circle", {
		cx: "14",
		cy: "2",
		r: "2"
	}), import_react.createElement("circle", {
		cx: "26",
		cy: "2",
		r: "2"
	}), import_react.createElement("circle", {
		cx: "2",
		cy: "12",
		r: "2"
	}), import_react.createElement("circle", {
		cx: "14",
		cy: "12",
		r: "2"
	}), import_react.createElement("circle", {
		cx: "26",
		cy: "12",
		r: "2"
	})) : title), filterEnabled && import_react.createElement(Icon, {
		active: filterShown,
		onClick: () => setShowFilter((f) => !f)
	}, import_react.createElement("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		height: "20",
		viewBox: "0 0 20 20"
	}, import_react.createElement("path", { d: "M9 9a2 2 0 114 0 2 2 0 01-4 0z" }), import_react.createElement("path", {
		fillRule: "evenodd",
		d: "M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a4 4 0 00-3.446 6.032l-2.261 2.26a1 1 0 101.414 1.415l2.261-2.261A4 4 0 1011 5z",
		clipRule: "evenodd"
	})))), import_react.createElement(FilterWrapper, { toggled: filterShown }, import_react.createElement(FilterInput, {
		ref: inputRef,
		setFilter,
		toggle
	})));
}
import_react.memo(({ store, rootClass, fill: _fill = false, flat: _flat = false, neverHide: _neverHide = false, oneLineLabels: _oneLineLabels = false, titleBar: _titleBar = {
	title: void 0,
	drag: true,
	filter: true,
	position: void 0,
	onDrag: void 0,
	onDragStart: void 0,
	onDragEnd: void 0
}, hideCopyButton: _hideCopyButton = false, toggled, setToggle }) => {
	var _titleBar$drag, _titleBar$filter;
	const paths = useVisiblePaths(store);
	const [filter, setFilter] = (0, import_react.useState)("");
	const tree = (0, import_react.useMemo)(() => buildTree(paths, filter), [paths, filter]);
	const [rootRef, set] = useTransform();
	const shouldShow = _neverHide || paths.length > 0;
	const title = typeof _titleBar === "object" ? _titleBar.title || void 0 : void 0;
	const drag = typeof _titleBar === "object" ? (_titleBar$drag = _titleBar.drag) !== null && _titleBar$drag !== void 0 ? _titleBar$drag : true : true;
	const filterEnabled = typeof _titleBar === "object" ? (_titleBar$filter = _titleBar.filter) !== null && _titleBar$filter !== void 0 ? _titleBar$filter : true : true;
	const position = typeof _titleBar === "object" ? _titleBar.position || void 0 : void 0;
	const onDrag = typeof _titleBar === "object" ? _titleBar.onDrag || void 0 : void 0;
	const onDragStart = typeof _titleBar === "object" ? _titleBar.onDragStart || void 0 : void 0;
	const onDragEnd = typeof _titleBar === "object" ? _titleBar.onDragEnd || void 0 : void 0;
	import_react.useEffect(() => {
		set({
			x: position === null || position === void 0 ? void 0 : position.x,
			y: position === null || position === void 0 ? void 0 : position.y
		});
	}, [position, set]);
	globalStyles();
	return import_react.createElement(TooltipProvider, null, import_react.createElement(PanelSettingsContext.Provider, { value: { hideCopyButton: _hideCopyButton } }, import_react.createElement(StyledRoot, {
		ref: rootRef,
		className: rootClass,
		fill: _fill,
		flat: _flat,
		oneLineLabels: _oneLineLabels,
		hideTitleBar: !_titleBar,
		style: { display: shouldShow ? "block" : "none" }
	}, _titleBar && import_react.createElement(TitleWithFilter, {
		onDrag: (point) => {
			set(point);
			onDrag === null || onDrag === void 0 || onDrag(point);
		},
		onDragStart: (point) => onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart(point),
		onDragEnd: (point) => onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd(point),
		setFilter,
		toggle: (flag) => setToggle((t) => flag !== null && flag !== void 0 ? flag : !t),
		toggled,
		title,
		drag,
		filterEnabled,
		from: position
	}), shouldShow && import_react.createElement(StoreContext.Provider, { value: store }, import_react.createElement(TreeWrapper, {
		isRoot: true,
		fill: _fill,
		flat: _flat,
		tree,
		toggled
	})))));
});
register(LevaInputs.SELECT, select);
register(LevaInputs.IMAGE, image);
register(LevaInputs.NUMBER, number$1);
register(LevaInputs.COLOR, color);
register(LevaInputs.STRING, string);
register(LevaInputs.BOOLEAN, boolean);
register(LevaInputs.INTERVAL, interval);
register(LevaInputs.VECTOR3D, vector3d);
register(LevaInputs.VECTOR2D, vector2d);
//#endregion
//#region node_modules/@nous-research/ui/dist/hooks/use-smooth-controls.js
var atomRegistry = /* @__PURE__ */ new Map();
var getControlAtom = (label, key) => atomRegistry.get(label)?.get(key);
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/blend-mode.js
var LAYER_KEYS = {
	bg: "bgColor",
	fg: "fgColor",
	mg: "mgColor"
};
var parseSpec = (spec) => {
	const [layer, alpha] = spec.split("/");
	return [layer, alpha ? parseFloat(alpha) : void 0];
};
var EMPTY_ATOM = /* @__PURE__ */ atom(void 0);
var useControlColor = (key, fallback) => {
	return useStore(getControlAtom("Lens", key) ?? EMPTY_ATOM) ?? fallback;
};
var useBlend = (against, spec) => {
	const layerKey = spec?.split("/")[0];
	const [target, alpha] = layerKey && layerKey in LAYER_KEYS ? parseSpec(spec) : [void 0, void 0];
	const againstColor = useControlColor(LAYER_KEYS[against], "#041c1c");
	const fgColor = useControlColor(LAYER_KEYS.fg, "#ffe6cb");
	const mgColor = useControlColor(LAYER_KEYS.mg, "#ffe6cb");
	const bgColor = useControlColor(LAYER_KEYS.bg, "#ffe6cb");
	const targetColor = target ? target === "fg" ? fgColor : target === "mg" ? mgColor : bgColor : spec;
	return (0, import_react.useMemo)(() => {
		if (!spec || !targetColor) return;
		const result = colorDodge(againstColor, targetColor);
		return alpha != null ? colorMix(result, alpha) : result;
	}, [
		spec,
		againstColor,
		targetColor,
		alpha
	]);
};
var useBlendMode = (opts = {}) => {
	const { against = "bg", background, color } = opts;
	return {
		backgroundColor: useBlend(against, background),
		color: useBlend(against, color)
	};
};
var BlendMode = polyRef(({ against, as, background, children, className, color, style, ...rest }, ref) => {
	const colors = useBlendMode({
		against,
		background,
		color
	});
	if (typeof children === "function") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: children(colors) });
	return (0, import_react.createElement)(as ?? "div", {
		...rest,
		children,
		className: cn(className),
		ref,
		style: {
			...colors,
			...style
		}
	});
});
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/badge.js
var BASE_CN = "inline-flex items-center font-compressed text-display px-2 py-1 leading-none tracking-[0.2em]";
var TONE_CLASSES = {
	destructive: "border border-destructive/30 bg-destructive/15 text-destructive",
	outline: "border border-midground/30 bg-transparent text-midground/80",
	secondary: "border border-midground/15 bg-midground/8 text-midground",
	success: "border border-success/30 bg-success/15 text-success",
	warning: "border border-warning/30 bg-warning/15 text-warning"
};
var Badge = ({ className, style, tone = "default", ...props }) => {
	if (tone === "default") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlendMode, {
		as: "span",
		background: "mg/0.075",
		className: cn(BASE_CN, className),
		color: "mg",
		style: {
			opacity: "var(--midground-alpha)",
			...style
		},
		...props
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(BASE_CN, TONE_CLASSES[tone], className),
		style,
		...props
	});
};
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/icons/check.js
function CheckIcon(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		fill: "none",
		viewBox: "0 0 12 12",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			clipRule: "evenodd",
			d: "M10.28 2.22a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 0 1-1.06 0L1.72 6.28a.75.75 0 1 1 1.06-1.06L4.5 6.94l4.72-4.72a.75.75 0 0 1 1.06 0Z",
			fill: "currentColor",
			fillRule: "evenodd"
		})
	});
}
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/checkbox.js
var Checkbox = (0, import_react.forwardRef)(function Checkbox2({ className, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
		className: cn("peer flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center border transition-colors outline-none", "focus-visible:ring-1 focus-visible:ring-midground/30", "disabled:cursor-not-allowed disabled:opacity-50", "data-[state=unchecked]:border-midground/20 data-[state=unchecked]:bg-background", "data-[state=unchecked]:hover:border-midground/30", "data-[state=checked]:border-midground/30 data-[state=checked]:bg-midground/15", "data-[state=indeterminate]:border-midground/30 data-[state=indeterminate]:bg-midground/15", className),
		ref,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
			className: "flex items-center justify-center text-current",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckIcon, { className: "h-3 w-3 text-midground" })
		})
	});
});
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/dialog.js
function Dialog({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		"data-slot": "dialog",
		...props
	});
}
function DialogPortal({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogPortal$1, {
		"data-slot": "dialog-portal",
		...props
	});
}
function DialogClose({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose$1, {
		"data-slot": "dialog-close",
		...props
	});
}
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50", "bg-black/60 backdrop-blur-sm", "data-[state=open]:animate-in data-[state=open]:fade-in-0", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0", className),
		"data-slot": "dialog-overlay",
		...props
	});
}
function DialogContent({ className, children, showCloseButton = true, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2", "grid w-full max-w-md gap-0", "border border-midground/15 bg-background-base text-foreground-base shadow-lg outline-none", "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95", "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95", "duration-150", className),
		"data-slot": "dialog-content",
		...props,
		children: [children, showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose$1, {
			className: cn("absolute top-3 right-3", "flex h-6 w-6 items-center justify-center", "text-midground/50 transition-colors hover:text-midground", "focus:outline-none focus-visible:ring-1 focus-visible:ring-midground/30", "disabled:pointer-events-none"),
			"data-slot": "dialog-close",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XIcon, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 p-4 border-b border-midground/15", className),
		"data-slot": "dialog-header",
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex items-center justify-end gap-2 p-3", className),
		"data-slot": "dialog-footer",
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-expanded text-sm font-bold tracking-[0.08em] uppercase", className),
		"data-slot": "dialog-title",
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("font-mondwest text-xs text-midground/60 leading-relaxed", className),
		"data-slot": "dialog-description",
		...props
	});
}
function XIcon({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		"aria-hidden": true,
		className,
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 2,
		viewBox: "0 0 24 24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "18",
			x2: "6",
			y1: "6",
			y2: "18"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "6",
			x2: "18",
			y1: "6",
			y2: "18"
		})]
	});
}
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/toast.js
function Toast({ toast }) {
	const [visible, setVisible] = (0, import_react.useState)(false);
	const [current, setCurrent] = (0, import_react.useState)(toast);
	(0, import_react.useEffect)(() => {
		if (toast) {
			setCurrent(toast);
			setVisible(true);
		} else {
			setVisible(false);
			const timer = setTimeout(() => setCurrent(null), 200);
			return () => clearTimeout(timer);
		}
	}, [toast]);
	if (!current || typeof document === "undefined") return null;
	return (0, import_react_dom.createPortal)(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-live": "polite",
		className: cn("fixed top-16 right-4 z-50 border px-4 py-2.5 font-courier text-xs tracking-wider uppercase backdrop-blur-sm", current.type === "success" ? "bg-success/15 text-success border-success/30" : "bg-destructive/15 text-destructive border-destructive/30"),
		role: "status",
		style: { animation: visible ? "toast-in 200ms ease-out forwards" : "toast-out 200ms ease-in forwards" },
		children: current.message
	}), document.body);
}
//#endregion
//#region node_modules/@nous-research/ui/dist/hooks/use-confirm-delete.js
function useConfirmDelete({ onDelete }) {
	const [pendingId, setPendingId] = (0, import_react.useState)(null);
	const [isDeleting, setIsDeleting] = (0, import_react.useState)(false);
	const requestDelete = (0, import_react.useCallback)((id) => {
		setPendingId(id);
	}, []);
	return {
		cancel: (0, import_react.useCallback)(() => {
			if (!isDeleting) setPendingId(null);
		}, [isDeleting]),
		confirm: (0, import_react.useCallback)(async () => {
			if (pendingId === null) return;
			const id = pendingId;
			setIsDeleting(true);
			try {
				await onDelete(id);
				setPendingId(null);
			} catch {} finally {
				setIsDeleting(false);
			}
		}, [pendingId, onDelete]),
		isDeleting,
		isOpen: pendingId !== null,
		pendingId,
		requestDelete
	};
}
//#endregion
//#region node_modules/@nous-research/ui/dist/hooks/use-toast.js
function useToast(duration = 3e3) {
	const [toast, setToast] = (0, import_react.useState)(null);
	const timerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, []);
	return {
		showToast: (0, import_react.useCallback)((message, type) => {
			if (timerRef.current) clearTimeout(timerRef.current);
			setToast({
				message,
				type
			});
			timerRef.current = setTimeout(() => setToast(null), duration);
		}, [duration]),
		toast
	};
}
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/card.js
var CARD_STYLE = {
	background: "var(--component-card-background)",
	borderImage: "var(--component-card-border-image)",
	boxShadow: "var(--component-card-box-shadow)",
	clipPath: "var(--component-card-clip-path)"
};
function Card({ className, style, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("border border-midground/15 bg-background-base/80 text-midground w-full", className),
		style: {
			...CARD_STYLE,
			...style
		},
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 p-4 border-b border-midground/15", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: cn("font-expanded text-sm font-bold tracking-[0.08em] uppercase", className),
		...props
	});
}
function CardDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("font-mondwest text-xs text-midground/60", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("p-4", className),
		...props
	});
}
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/input.js
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("flex h-9 w-full border border-midground/15 bg-background/40 px-3 py-1 font-courier text-sm transition-colors", "placeholder:text-midground/50", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground/30 focus-visible:border-midground/25", "disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/label.js
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("font-mondwest text-xs tracking-[0.1em] uppercase leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className),
		...props
	});
}
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/separator.js
function Separator({ className, orientation = "horizontal", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		"aria-orientation": orientation,
		role: "separator",
		className: cn("shrink-0 bg-midground/15", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
		...props
	});
}
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/tabs.js
function Tabs({ children, className, defaultValue }) {
	const [active, setActive] = (0, import_react.useState)(defaultValue);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-4", className),
		children: children(active, setActive)
	});
}
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("inline-flex h-9 items-center justify-start border-b border-midground/15 text-text-secondary", className),
		...props
	});
}
function TabsTrigger({ active, className, value: _value, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn("relative inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5", "font-mondwest text-display text-xs tracking-[0.1em] transition-all cursor-pointer", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground/30", active ? "text-midground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-midground" : "text-text-secondary hover:text-midground", className),
		type: "button",
		...props
	});
}
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/stats.js
function Stats({ className, items, flip, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex w-full flex-col gap-5", className),
		...props,
		children: items.map(({ label, value }) => {
			const valueText = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				className: "text-xs leading-[1.4] tracking-widest",
				expanded: true,
				children: typeof value === "string" ? value : value.node
			});
			const labelText = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
				className: "leading-none tracking-[0.2em] opacity-60",
				mono: true,
				children: typeof label === "string" ? label : label.node
			});
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-midground text-display grid grid-cols-[auto_1fr_auto] items-center gap-2.5",
				children: [
					flip ? labelText : valueText,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
						className: "min-w-0 overflow-hidden text-[13px] leading-[1.4] tracking-[0.4em] opacity-20",
						expanded: true,
						children: "·".repeat(100)
					}),
					flip ? valueText : labelText
				]
			}, (typeof label === "string" ? label : label.key) + "@@@" + (typeof value === "string" ? value : value.key));
		})
	});
}
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/switch.js
var Switch = (0, import_react.forwardRef)(function Switch2({ checked, className, disabled, id, onCheckedChange, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		"aria-checked": checked,
		className: cn("peer inline-flex h-5 w-9 shrink-0 items-center border transition-colors cursor-pointer", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground/30", "disabled:cursor-not-allowed disabled:opacity-50", checked ? "bg-midground/15 border-midground/30" : "bg-background border-midground/20", className),
		disabled,
		id,
		onClick: () => onCheckedChange(!checked),
		ref,
		role: "switch",
		type: "button",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: cn("pointer-events-none block h-3.5 w-3.5 transition-transform", checked ? "translate-x-4 bg-midground" : "translate-x-0.5 bg-midground/40")
		})
	});
});
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/typography/h2.js
var H2 = (0, import_react.forwardRef)(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
		as: "h2",
		className: cn("font-bold", className),
		variant: "lg",
		ref,
		...props
	});
});
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/segmented.js
function Segmented({ className, onChange, options, size = "sm", value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("inline-flex border border-midground/15 bg-background/30", className),
		role: "radiogroup",
		children: options.map((opt) => {
			const active = opt.value === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-checked": active,
				className: cn("font-mondwest text-display tracking-[0.1em]", "transition-colors cursor-pointer whitespace-nowrap", "border-r border-midground/15 last:border-r-0", "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground/30", size === "sm" && "h-7 px-2.5 text-xs", size === "md" && "h-8 px-3 text-xs", active ? "bg-midground text-background" : "text-text-secondary hover:bg-midground/10 hover:text-midground"),
				onClick: () => onChange(opt.value),
				role: "radio",
				type: "button",
				children: opt.label
			}, opt.value);
		})
	});
}
function FilterGroup({ children, className, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-mondwest text-display text-xs tracking-[0.12em] text-text-tertiary",
			children: label
		}), children]
	});
}
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/typography/small.js
var Small = (0, import_react.forwardRef)((props, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Typography, {
		as: "small",
		mondwest: true,
		variant: "sm",
		ref,
		...props
	});
});
//#endregion
//#region node_modules/@nous-research/ui/dist/ui/components/command-block.js
function CopyButton({ children, className, copiedLabel = "Copied!", label = "Copy", resetDelayMs = 2e3, text }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const handleCopy = (0, import_react.useCallback)(() => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), resetDelayMs);
		});
	}, [resetDelayMs, text]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn("font-courier text-display cursor-pointer border-none bg-transparent text-xs", "tracking-widest", "hover:text-midground tap-highlight-transparent transition-colors", "flex items-center justify-center", copied ? "text-midground" : "text-text-secondary", className),
		onClick: handleCopy,
		type: "button",
		children: children ?? (copied ? copiedLabel : label)
	});
}
function CommandBlock({ className, code, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col gap-1", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Small, {
				className: "opacity-50",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyButton, { text: code })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("bg-background/40 font-courier border border-current/20", "px-3 py-2 text-[0.6875rem] leading-relaxed lowercase"),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
				className: "break-all",
				children: code
			})
		})]
	});
}
//#endregion
export { Badge as A, Button$1 as B, DialogClose as C, DialogHeader as D, DialogFooter as E, useBelowBreakpoint as F, twMerge as H, ConfirmDialog as I, Spinner as L, BottomSheet as M, Select$1 as N, DialogTitle as O, SelectOption as P, braille_default as R, Dialog as S, DialogDescription as T, clsx as U, Typography as V, CardHeader as _, H2 as a, useConfirmDelete as b, Tabs as c, Separator as d, Label as f, CardDescription as g, CardContent as h, Segmented as i, ListItem as j, Checkbox as k, TabsList as l, Card as m, CopyButton as n, Switch as o, Input as p, FilterGroup as r, Stats as s, CommandBlock as t, TabsTrigger as u, CardTitle as v, DialogContent as w, Toast as x, useToast as y, SelectionSwitcher as z };
