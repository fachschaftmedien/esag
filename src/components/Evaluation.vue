<template>
	<div class="evaluation-form">
		<div class="form-row">
			Studiengang-Platzhalter
		</div>
		<div class="form-row-appendix" v-if="submitted && !isValidCourse">
			<p class="error"> Bitte wähle deinen Studiengang aus </p>
		</div>
		<div class="form-row">
			 <ul class="radio-group">
				<li class="radio-item" v-for="(label, value) in satisfactions">
					<div class="radio">
						<input type="radio" :id="'radio-option-'+value" name="selector" v-model="satisfaction" :value="value">
						<div class="check"></div>
					</div>
					<label :for="'radio-option-'+value" class="radio-label">{{label}}</label>
					
				</li>
			</ul>
		</div>
		<div class="form-row-appendix" v-if="submitted && !isValidSatisfaction">
			<p class="error"> Bitte trage ein, wie Dir die Ersti-Woche gefallen hat</p>
		</div>
		<div class="form-row group">	
			<input type="text" :max-length="commentMaxLength" v-model="good" required>
			<span class="highlight"></span>
			<span class="bar"></span>
			<label>Was hat dir an der Ersti-Woche gut gefallen?</label>
		</div>
		<div class="form-row-appendix" v-if="submitted && !isValidGood">
			<p class="error"> Bitte verwende unter 600 Zeichen </p>
		</div>
		<div class="form-row group">	
			<input type="text" :max-length="commentMaxLength" v-model="bad" required>
			<span class="highlight"></span>
			<span class="bar"></span>
			<label>Was hat dir an der Ersti-Woche weniger gut gefallen?</label>
		</div>
		<div class="form-row-appendix" v-if="submitted && !isValidBad">
			<p class="error"> Bitte verwende unter 600 Zeichen </p>
		</div>
		<div class="form-row">
			<button type="button" class="button btn"> <span class="fa fa-send"></span> senden </button>
		</div>
	</div>
</template>

<script>
export default {
	name: "Evaluation",
	data(){
		return {
			course: "",
			allowedCourses: ["MI","MT","TuB"],
			satisfactions: {1: "gut", 2: "neutral", 3: "schlecht"},
			satisfaction: 0,
			good: "",
			bad: "",
			commentMaxLength: 600,
			submitted: true
		}
	},
	computed: {
		isValidCourse(){
			return this.allowedCourses.indexOf(this.course) >= 0;
		},
		isValidSatisfaction(){
			return this.satisfaction >= 1 && this.satisfaction <= 3;
		},
		isValidGood(){
			return this.good.length < this.commentMaxLength;
		},
		isValidBad(){
			return this.bad.length < this.commentMaxLength;
		},
		isCompletelyValid(){
			return this.isValidCourse && this.isValidSatisfaction && this.isValidGood && this.isValidBad;
		}
	},
	methods: {
		submit(){
			this.submitted=true;
			console.log(this);
		}
	}
}
</script>

<style lang="scss">
div.form-row.group{
	margin-top: 2em;
}

ul.radio-group{
  list-style: none;
  min-height: 1em;
  display: flex;
  flex-direction: row;
  align-items: center;
}

ul.radio-group li{
  margin: 1em;
  color: #AAAAAA;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}

ul.radio-group li input[type=radio]{
  position: absolute;
  visibility: hidden;
}

ul.radio-group li label{
  display: block;
  z-index: 9;
  cursor: pointer;
  color: #AAAAAA;
  -webkit-transition: all 0.25s linear;
}

ul.radio-group li:hover label{
	color: #006494;
}

ul.radio-group li .check{
  border: 5px solid #AAAAAA;
  border-radius: 100%;
  height: 25px;
  width: 25px;
  z-index: 5;
  transition: border .25s linear;
  -webkit-transition: border .25s linear;
}

ul.radio-group li:hover .check {
  border: 5px solid #006494;
}

ul.radio-group li .check::before {
  display: block;
  content: '';
  border-radius: 100%;
  transition: background 0.25s linear;
  -webkit-transition: background 0.25s linear;
}

input[type=radio]:checked ~ .check {
  border: 5px solid #0DFF92;
}

input[type=radio]:checked ~ .check::before{
  background: #0DFF92;
}

input[type=radio]:checked ~ label{
  color: #0DFF92;
}

label.radio-label{
	position: initial;
}

</style>