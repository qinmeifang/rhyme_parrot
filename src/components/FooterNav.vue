<template>
	<div class="footer-nav">
    	<a href="/h5/index.html" class="bar active">
    		<i class="fa fa-search-plus"></i>
    		<span>押韵</span>
    	</a>
    	<a  class="bar"href="/search.html">
    		<i class="fa fa-search"></i>
    		<span>搜索</span>
    	</a>
    	<a class="bar" href="/gallery.html">
    		<i class="fa fa-compass"></i>
    		<span>发现</span>
    	</a>
    </div>
</template>
<style lang="scss">
	.footer-nav{
		position: fixed;
		height: 100px;
		line-height: 100px;
		width: 100%;
		bottom: 0;
		background: #f6f6f6;
		display: flex;
		display: flex;
      	justify-content: space-between;
      	font-size: 24px;
		.bar{
			cursor: pointer;
			color: #999999;
			text-align: center;
			width:30%;
			height:120px;
			i{	
				font-size: 50px;
				margin-top: 10px;
				height:50px;
				display: block;
			}
			span{
				height: 50px;
				line-height: 40px;
				display: block;
			}

		}
		.active{
			color: #0dba09;
		}

	}
</style>
<script >
	export default{
		
	}	
</script>

