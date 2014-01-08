/*
 * Dom Select plugin 
 * https://page.kakao.com/store/kakaopage
 * Copyright 2014 'J' in Podotree, Inc.
 * Email : jj81.corp@gmail.com
 * Released under the MIT license
 * Date: 2014-01-08
 * version : 0.1
 */

(function(window, undefined) {
	/*
	* Variables
	*/
	var
	document = window.document,
	location = window.location;

	/*
	* @ Main Selector Class
	* @ param1 {String} : type (tagName, className, idName)
	* @ param2 {String} : elementName
	*/

	function queryDom(type, elementName) {

		var type = type.toLowerCase();

		if(type === "tag") {
			this.target = document.getElementsByTagName(elementName);
		} else if(type === "class") {
			this.target = document.getElementsByClassName(elementName);
		} else if (type === "id") {
			this.target = document.getElementById(elementName);
		} else {
			throw "[ERROR] there\'s no type."
		}
		// 특정 태그만 입력했을 경우 생성하는 것 설정할 것.

		_target = this.target;

		// @ Return several Method
		_target.html = function (index) {
			if(!index) index = 0;
			if(index !== 'all') {
				if(type !== "id") {
					return this[index].innerHTML;
				} else {
					return this.innerHTML;
				}	
			} else {
				var tmp = '';
				for(var i=0, len = this.length;i<len;i++) {
					tmp += this[i].innerHTML;
				}
				return tmp;
			}
		};

		_target.tagName = function () {
			// return this[0].tagName;
			return this[0].tagName;
		};
		
		_target.size = function () {
			// 해당 태그 사이즈 개수를 가져온다.
			return null;
		}

		
		_target.addClass = function (index, newClassName) {
			if(type !== "id") {
				_this = this[index];
			} else {
				_this = this;
			}

			var cachedClassByClass = _this.getAttribute("class");
			var tmpStorage;
			
			if(cachedClassByClass) {
				tmpStorage = cachedClassByClass + " " + newClassName;
				_this.setAttribute("class", tmpStorage);
				tmpStorage = null;
			} else {
				_this.setAttribute("class", newClassName);
			}
		}


		/* 
		* 에러 처리 메시지 및 후행처리와 관련된 함수를 만들어 범용적으로 사용하자.
		*/
		function error(type, message) {
			throw {
				type : type,
				message : message
			};
		}


		/**
		 * Create key-value caches of limited size
		 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
		 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
		 *	deleting the oldest entry
		 * 수정이 필요.
		 */
		function createCache() {
			var cache,
				keys = [];

			return (cache = function( key, value ) {
				// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
				if ( keys.push( key += " " ) > Expr.cacheLength ) { 
		 			// Only keep the most recent entries
					delete cache[ keys.shift() ];
				}
				return (cache[ key ] = value);
			});
		}

		return _target; // 여기서 리턴할 경우 나머지 메소드를 사용할 수 없다.
	}



	/*
	* @ Proxy
	* @ Return {Object} : queryDom func
	*/
	function j(type, elementName) {
		return new queryDom(type, elementName);
	}

	window.j = j;
	window.queryDom = queryDom;

})(window);