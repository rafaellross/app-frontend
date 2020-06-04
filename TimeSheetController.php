<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use DB;
use App\TimeSheet;

class TimeSheetController extends Controller
{
    public function index() {
        $filter = "week_end = '" . Carbon::parse(\App\Parameters::all()->first()->week_end_timesheet)->format('Y-m-d') . "'";
        return $filter;
        $timesheets = DB::select(
            DB::raw(
                "
                select id,
                username,
                created_at,
                name,
                total,
                total_15,
                total_20,
                date_format(week_end, '%d/%m/%Y') as week_end,

                integrated,
                integration_message,
                company,
                job

                from (
                    select ts.id,
                          users.username,
                          ts.created_at,
                          emp.name,
                          ts.total,
                          ts.total_15,
                          ts.total_20,
                          ts.week_end,

                          ts.integrated,
                          ts.integration_message,
                          emp.company,
                          (
                          select code from (
                              select
                              jobs.code,
                              sum(job.end - job.start) as total,
                              time_sheets.id as ts_id
                              from time_sheets
                              join days
                              on time_sheets.id = days.time_sheet_id
                              join day_jobs job
                              on job.day_id = days.id
                              join jobs
                              on jobs.id = job.job_id
                              group by jobs.code, time_sheets.id
                          ) as job where ts_id = ts.id order by total desc limit 1 ) as job

                  from time_sheets ts
                  left join users
                  on ts.user_id = users.id
                  inner join employees emp
                  on emp.id = ts.employee_id) timesheets
                  where
                  " . $filter . " order by name asc")
          );
          //                  where
                    //ts.week_end = '" .  Carbon::parse(\App\Parameters::all()->first()->week_end_timesheet)->format('Y-m-d') ."'"
          return $timesheets;

    }

    public function print($timesheets) {

        //Put Ids in an array
        $ids = explode(",", $timesheets);

        //Create report object
        $report = new \App\TimeSheetReport();

        $report->SetCompression(true);

        ///Add TimeSheets to report
        foreach ($ids as $id) {
            $timesheet = TimeSheet::find($id);
            if ($timesheet) {
                $report->add($timesheet);
            }
        }
            $file_name = md5(mt_rand());

            $report->output('F', __DIR__ . "/../../../../../tmp/" . $file_name . ".pdf");


            return response()->json([
                "path" => "http://smartplumbingsolutions.com.au/development/tmp/$file_name.pdf"
            ]);
    }

    public function store(Request $request)
   {
      return $request;

       $this->validate(request(), [
           'week_end' => 'required|date_format:d/m/Y'
       ]);

       //Validate rdo, pld and annual leave
       $errors = [];
       foreach ($request->get('employees') as $employee_id => $value) {
           $employee = Employee::find($employee_id);

           //Validate rdo
           $rdo = 0;
           $pld = 0;
           $anl = 0;
           $sick = 0;

           $rdo += $request->get('rdo') > 0 ? $request->get('rdo')/60 : 0;
           $pld += $request->get('pld') > 0 ? $request->get('pld')/60 : 0;
           $anl += $request->get('anl') > 0 ? $request->get('anl')/60 : 0;
           foreach ($request->get('days') as $key => $day) {
               foreach ($day as $key => $job) {

                   if (isset($job["job"])) {
                       if ($job["job"] == "rdo") {
                           $rdo += $job["hours"] > 0 ? Hour::convertToDecimal($job["hours"]) : 0;
                       }
                       if ($job["job"] == "pld") {
                           $pld += $job["hours"] > 0 ? Hour::convertToDecimal($job["hours"]) : 0;
                       }

                       if ($job["job"] == "anl") {
                           $anl += $job["hours"] > 0 ? Hour::convertToDecimal($job["hours"]) : 0;
                       }
                       if (isset($job["sick"]) && $job["sick"]) {
                           $sick += $job["hours"] > 0 ? Hour::convertToDecimal($job["hours"]) : 0;
                       }

                   }
               }
           }
           if ($rdo > 0 && ($rdo) > $employee->rdo_bal) {
             array_push($errors, "Employee: " . $employee->name . " doesn't have enough RDO to request " . round($rdo, 2) . " hours! Balance: " . $employee->rdo_bal . '\n');
           }


           if ($pld > 0 && ($pld) > $employee->pld) {
               array_push($errors, "Employee: " . $employee->name . " doesn't have enough PLD to request " . round($pld, 2) . " hours! Balance: " . $employee->pld . '\n');
           }

           if ($anl > 0 && ($anl) > $employee->anl) {
               array_push($errors, "Employee: " . $employee->name . " doesn't have enough Annual Leave to request " . round($anl, 2) . " hours! Balance: " . $employee->anl . '\n');
           }

           if ($sick > 0 && ($sick) > $employee->sick_bal) {
               array_push($errors, "Employee: " . $employee->name . " doesn't have enough Sick Leave to request " . round($sick, 2) . " hours! Balance: " . $employee->sick_bal . '\n');
           }


       }
       if (count($errors) > 0) {
           array_push($errors, '\n');
           array_push($errors, '\n');
           array_push($errors, "Fix it and try again! " . '\n');
           return '<script>alert("' . implode(" ", $errors) . '"); window.history.back();</script>';
           //return redirect('/timesheets?filter=1')->withInput()->with('error', $errors);
       }


       foreach ($request->get('employees') as $employee_id => $value) {


           $timeSheet = new TimeSheet();
           $timeSheet->emp_signature   = $request->get('emp_signature');
           $timeSheet->employee_id     = $employee_id;
           $timeSheet->week_end        = Carbon::createFromFormat('d/m/Y', $request->get('week_end'));
           $timeSheet->rdo             = $request->get('rdo');
           $timeSheet->pld             = $request->get('pld');
           $timeSheet->anl             = $request->get('anl');

           $totals = $request->get('totals');
           $timeSheet->total           = $totals['total'];
           $timeSheet->normal          = $totals['normal'];
           $timeSheet->total_15        = $totals['1.5'];
           $timeSheet->total_20        = $totals['2.0'];

           $timeSheet->user_id         = Auth::id();
           $timeSheet->status          = $request->get('status');
           $timeSheet->save();


           foreach ($request->get('days') as $key => $day) {
               $weekDay                        = WeekDay::where("short", "=", $key)->get()->first();
               $dayTimeSheet                   = new Day();
               $dayTimeSheet->week_day         = $weekDay->number;
               $dayTimeSheet->day_dt           = Carbon::instance($timeSheet->week_end)->subDays($weekDay->days_to_end);

               $dayTimeSheet->total           = $day['total']['total'];
               $dayTimeSheet->normal          = $day['total']['normal'];
               $dayTimeSheet->total_15        = $day['total']['1.5'];
               $dayTimeSheet->total_20        = $day['total']['2.0'];

               $dayTimeSheet->time_sheet_id    = $timeSheet->id;
               $dayTimeSheet->save();

               foreach ($day as $key => $job) {

                   if (intval($key)) {
                       $dayJob               = new DayJob();

                       //Check if job was set and if it's sick

                       if (isset($job["job"]) && $job["job"] == "sick") {

                           $job_id = !isset($job["description"]) ? null : Job::where("code", $job["description"])->value('id');
                           $dayJob->sick = true;

                       } elseif (isset($job["job"]) && $job["job"] == "tafe") {

                           $job_id = !isset($job["description"]) ? null : Job::where("code", $job["description"])->value('id');
                           $dayJob->tafe = true;

                       } elseif (isset($job["job"]) && $job["job"] == "holiday") {

                           $job_id = !isset($job["description"]) ? null : Job::where("code", $job["description"])->value('id');
                           $dayJob->public_holiday = true;

                       } else {

                           $job_id = !isset($job["job"]) ? null : Job::where("code", $job["job"])->value('id');
                           $dayJob->sick = false;
                           $dayJob->tafe = false;
                           $dayJob->public_holiday = false;

                       }

                       $dayJob->job_id       =  isset($job_id) && !is_null($job_id) ? $job_id : null;

                       $dayJob->day_id       = $dayTimeSheet->id;
                       $dayJob->number       = $key;
                       $dayJob->description  = $job["description"];
                       $dayJob->start        = !isset($job["start"]) ? null : $job["start"];
                       $dayJob->end          = !isset($job["end"]) ? null : $job["end"];
                       $dayJob->night_work   = !isset($job["night_work"]) ? false : true;
                       $dayJob->save();

                   }
               }
           }

           if (!empty($request->get('medical_certificates')) > 0) {
               $certificate_number = 1;
               foreach ($request->get('medical_certificates') as $value) {
                   if (!is_null($value)) {
                       $certificate = new TimeSheetCertificate();
                       $certificate->time_sheet_id = $timeSheet->id;
                       $certificate->certificate_img = $value;
                       $certificate->certificate_number = $certificate_number;
                       $certificate->save();
                       $certificate_number++;
                   }
               }
           }

       }

       return redirect('/timesheets?filter=1')->with('success', 'Time Sheet has been added');
   }

   function hoursByJob() {

   }

   public function charts() {

     $timesheets = TimeSheet::where('week_end', '>', Carbon::now()->subWeeks(2)->format('Y-m-d'))->select('id', 'week_end', 'employee_id')->get();
     $arr = array();

     foreach ($timesheets as $timesheet) {
            // {week: 2020-05-31, job: '001', hours: 40}

              foreach ($timesheet->listHours() as $job => $hour) {

                if (isset($arr[$timesheet->week_end][$job])) {
                  $arr[$timesheet->week_end][$job] += $hour;
                } else {
                  $arr[$timesheet->week_end][$job] = $hour;
                }
                /*

                if(!isset($arr[$timesheet->week_end])) {
                  $arr[$timesheet->week_end] = [];

                }

                array_push($arr[$timesheet->week_end], ['job' => $job , 'hours' => $hour]);
*/

              }


     }

     return $arr;
   }
}
