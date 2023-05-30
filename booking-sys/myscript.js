var Calndr = function(divId,Date) {
	this.divId = divId;
	this.DaysOfWeek = [
	'Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
	this.Months = ['Январь','Фефраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
	this.currMonth= Date.getMonth();
	this.currYear = Date.getFullYear();
	this.currDay = Date.getDate();
}
Calndr.prototype.nextMonth = function() {
	if (this.currMonth == 11) {
		this.currMonth = 0;
		this.currYear = this.currYear + 1;
	} else { this.currMonth = this.currMonth + 1;}
	this.showcurr();
}
Calndr.prototype.previousMonth = function() {
	if (this.currMonth == 0) {
		this.currMonth = 11;
		this.currYear = this.currYear - 1;
	} else { this.currMonth = this.currMonth - 1;}
	this.showcurr();
}
Calndr.prototype.showcurr = function() {
	this.showMonth(this.currYear, this.currMonth);
}
Calndr.prototype.showMonth = function(y,m) {
	var d = new Date()
	, firstDayOfMonth = new Date(y, m, 7).getDay()
	, lastDayOfMonth = new Date(y, m+1,0).getDate()
	, lastDayOfLastMonth = m == 0? new Date(y-1, 11, 0).getDate() : new Date(y,m,0).getDate();
	var html = '<table class=table border="1" cellpadding="4">';
	html += '<thead style="text-align:center"><tr>';
	html += '<td colspan="7">'+this.Months[m]+' '+y+'</td>';
	html += '</tr></thead>';
	html += '<tr class="days">';
	for (let i=0; i< this.DaysOfWeek.length;i++) {
		html += '<td>'+ this.DaysOfWeek[i]+'</td>';
	}
	html += '</tr>';
	var i=1;
	do {
		var dow = new Date(y,m, i).getDay();
		if (dow == 1) {
			html += '<tr>';
		}
		else if (i==1) {
			html += '<tr>';
			var k = lastDayOfLastMonth - firstDayOfMonth+1;
			for (var j=0; j < firstDayOfMonth; j++) {
				html += '<td class="not-current">'+k+'</td>';
				k++
			}
		}
		
		var chk = new Date();
		var chkY = chk.getFullYear();
		var chkM = chk.getMonth();
		if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
			html += '<td class="today no-select">'+i+'</td>';
		} else {
			html += '<td class="normal no-select">'+i+'</td>';
		}
		if (dow ==0) {
			html +='</tr>';
		} else if ( i == lastDayOfMonth) {
			var k = 1;
			for(dow; dow<7; dow++) {
				html+='<td class="not-current no-select">'+k+'</td>';
				k++;
			}
		}
		i++;
		}while(i<=lastDayOfMonth);
	html+='</table>';
	document.getElementById(this.divId).innerHTML= html;
}
window.onload = function() {
	d = new Date();
	var c = new Calndr("divCaldr",d);
	c.showcurr();
	getId('btnNx').onclick = function() {
		c.nextMonth();
	};
	getId('btnPr').onclick = function() {
		c.previousMonth();
	};
	$('body').delegate('.normal','click',function(){
		$(this).toggleClass("green-color");
		$(this).toggleClass("white-font");
	})
}
function getId(id) {
	return document.getElementById(id);
}