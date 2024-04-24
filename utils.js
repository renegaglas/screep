const Job = { // move to utils.job
    Harvester: "harvester",
    Builder: "builder",
    Upgrader: "upgrader",
    Carrier: "carrier"
  };

var GetJob = { // move to utils.job
    /** @param {null} **/
    run: function() {
        //creep.say('🔄U+23FB new job');
        var carriers = _.filter(Game.creeps, (creep) => creep.memory.reference_role == Job.Carrier);
        var builders = _.filter(Game.creeps, (creep) => creep.memory.reference_role == Job.Builder);
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.reference_role == Job.Upgrader);
        var total = carriers.length + builders.length + upgraders.length;
        //console.log("carriers.length = " + carriers.length);
        //console.log("builders.length = " + builders.length);
        //console.log("upgraders.length = " + upgraders.length);

        //console.log("total = " + total);

        if (total == 0)
        {
            total = 1;
        }

        //define the proportion of job (arbitrary)
        var carrier_target = 1; // upgrade to : global variable
        var builder_target = 6;
        var upgrader_target = 1;
        var total_target = carrier_target + builder_target + upgrader_target;
        if (carriers.length / total < carrier_target / total_target)
        {
            //console.log("GetJob return : " + Job.Carrier);
            return Job.Carrier;
        }
        else if (builders.length / total < builder_target / total_target)
        {
            //console.log("GetJob return : " + Job.Builder);
            return Job.Builder;
        }
        else if (upgraders.length / total < upgrader_target / total_target)
        {
            //console.log("GetJob return : " + Job.Upgrader);
            return Job.Upgrader;
        }
        else {
            //console.log("GetJob return default : " + Job.Carrier);
            return Job.Carrier //carrier by default
        }
    }
};

var switch_job_to = { // move to utils.job
    /** @param {Creep, Job}  creep job job **/
    run: function(creep, job) {
        creep.memory.role = job;
    }
};

var retrive_job = { // move to utils.job
    /** @param {Creep}  creep**/
    run: function(creep) {
        creep.memory.role = creep.memory.reference_role;
    }
};

var clear_dead_creap = { // move to utils.hivemind
    //may need upgrade to clear every dead things (like structure)
    /** @param {null}  **/
    run: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }
    }
};

var check_spawning = { // move to utils.hivemind
    /** @param {null}  **/
    run: function() {
        for(var spawn in Game.spawns) {
            if(Game.spawns[spawn].spawning) {
                var spawningCreep = Game.creeps[Game.spawns[spawn].spawning.name];
                Game.spawns[spawn].room.visual.text(
                    '🛠️' + spawningCreep.memory.role,
                    Game.spawns[spawn].pos.x + 1,
                    Game.spawns[spawn].pos.y,
                    {align: 'left', opacity: 0.8});
            }
        }
    }
};
var spawn_creeps = { // move to utils.hivemind
    /** @param {Job}  job **/
    run: function(job = null) {
        var body = [WORK,WORK,CARRY,MOVE];
        for(var spawn_name in Game.spawns) {
            var dry_exit_code = Game.spawns[spawn_name].spawnCreep(body, "unused_name",
            {dryRun : true});
            if (dry_exit_code != 0)
            {
                continue;
            }

            if (job == null)
            {
                job = GetJob.run(); // select a job for the creep
            }
            var newName = job + '_' + Game.time;
            if (Game.spawns[spawn_name].spawnCreep(body, newName,
                {memory: {role: job, reference_role : job}}) == 0)
            {
                //console.log('Spawning new ' + job + ': ' + newName);
                return newName;
            }
    }
    return null;
    }
};



module.exports = {Job, GetJob, clear_dead_creap, spawn_creeps, check_spawning, switch_job_to, retrive_job};
