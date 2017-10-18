<template>
	<div class="evaluation-form">
    <div class="form-row">
      Um den Ablauf der Ersti-Woche jedes Jahr besser zu gestalten, fragen wir hier an dieser Stelle,
      was in zukünftigen Jahren besser gemacht werden könnte.
      Alle Antworten sind anonym und dienen nur zur Verbesserung der Arbeit der ESAG.
    </div>
		<div class="form-row form-row-large">
      <p> Studiengang: </p>
      <div id="course-selection">
        <dropdown :options="allowedCourses" :placeholder="'klicke hier, um deinen Studiengang auszuwählen'" v-model="course"></dropdown>
      </div>
		</div>
		<div class="form-row-appendix">
			<p class="error" v-if="submitted && !isValidCourse"> Bitte wähle deinen Studiengang aus </p>
		</div>
		<div class="form-row">
      Wie fandet ihr die Ersti-Woche?
			 <ul class="radio-group">
				<li class="radio-item" v-for="(label, value) in satisfactions">
					<div class="radio">
						<input type="radio" :id="'radio-option-'+value" name="selector" v-model="satisfaction" :value="value">
						<div class="check" @click="trigger('radio-option-'+value)"></div>
					</div>
					<label :for="'radio-option-'+value" :class="'radio-label '+(value === satisfaction ? 'active' : 'inactive')">{{label}}</label>
				</li>
			</ul>
		</div>
		<div class="form-row-appendix">
			<p class="error" v-if="submitted && !isValidSatisfaction"> Bitte trage ein, wie Dir die Ersti-Woche gefallen hat</p>
		</div>
		<div class="form-row group">
			<input type="text" :max-length="commentMaxLength" v-model="good" required>
			<span class="highlight"></span>
			<span class="bar"></span>
			<label>Was hat dir an der Ersti-Woche gut gefallen?</label>
		</div>
		<div class="form-row-appendix">
			<p class="error" v-if="submitted && !isValidGood"> Bitte verwende unter 600 Zeichen </p>
		</div>
		<div class="form-row group">
			<input type="text" :max-length="commentMaxLength" v-model="bad" required>
			<span class="highlight"></span>
			<span class="bar"></span>
			<label>Was hat dir an der Ersti-Woche weniger gut gefallen?</label>
		</div>
		<div class="form-row-appendix">
			<p class="error" v-if="submitted && !isValidBad"> Bitte verwende unter 600 Zeichen </p>
		</div>
		<div class="form-row">
			<button type="button" class="button btn" @click="submit"> <span class="fa fa-send"></span> senden </button>
		</div>
    <div class="form-row-appendix">
      <p class="error" v-if="serverError && !serverSuccess"> {{ serverError }} </p>
      <p class="success" v-if="serverSuccess && !serverError"> {{ serverSuccess }} </p>
    </div>
	</div>
</template>

<script>
import Dropdown from '@/components/Dropdown';

export default {
	name: "Evaluation",
  components: {
	    Dropdown
  },
  props: {
	    endpoint: String
  },
	data(){
		return {
			course: "",
			allowedCourses: ["MI", "MT", "TuB"],
			satisfactions: {1: "gut", 2: "neutral", 3: "schlecht"},
			satisfaction: 0,
			good: "",
			bad: "",
			commentMaxLength: 600,
			submitted: false,
      serverError: "",
      serverSuccess: ""
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
	  trigger(id){
	      let elem = document.getElementById(id);
	      if(elem) elem.click();
    },
    selectCourse(course){
	      this.course = course;
    },
    showError(msg){
        this.serverError=msg;
        this.serverSuccess=false;
    },
    showSuccess(msg){
        this.serverSuccess=msg;
        this.serverError=false;
    },
		submit(){
			this.submitted=true;
			if(this.isCompletelyValid){
        fetch("http://evaluation-evaluation.193b.starter-ca-central-1.openshiftapps.com/evaluation", {
          method: "post",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            course: this.course,
            satisfaction: this.satisfaction,
            good: this.good,
            bad: this.bad
          })
        })
        .then(response => response.json())
        .then(message => {
            if(message.error) {
              this.showError(message.text);
            }else{
              this.showSuccess(message.text);
              // reset fields to make clear the form was sent
              this.good = " ";
              this.bad = " ";
              this.satisfaction = 0;
              this.course = "";
              this.submitted = false;
            }
        })
        .catch(err => this.showError(err.message));
      }else{
			    this.showError("Daten nicht gesendet, da einige Formularfelder fehlerhaft oder leer sind");
      }
		}
	}
}
</script>

<style lang="scss">
.evaluation-form{
  width: 100%;
}

div.form-row{
	margin-top: 4em;
  width: 100%;

  input[type="text"]{
    width: 100%;
    padding-bottom: 0.5em;
  }
}

div.form-row-large{
  min-height: 8em;
}

.form-row-large + .form-row-appendix + .form-row{
  margin-top: 1em;
}

div.form-row-appendix{
  min-height: 1em;
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
  padding-left: 0.5em;
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

ul.radio-group li .check:before{
  transition: color .25s linear;
  -webkit-transition: color .25s linear;
}

ul.radio-group li:hover .check {
  border: 5px solid #006494;
}

ul.radio-group li:hover .check:before {
  color: #006494;
}

input[type=radio]:checked ~ .check {
  border: 5px solid rgb(250, 174, 39);
}

input[type=radio]:checked ~ .check:before {
  height: 25px;
  width: 25px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  content: 'X';
  color: rgb(250, 174, 39);
}


label.radio-label.active{
  color: rgb(250, 174, 39);
}


label.radio-label{
	position: initial;
}

p.error{
  color: darkred;
}

p.success{
  color: darkgreen;
}

</style>
