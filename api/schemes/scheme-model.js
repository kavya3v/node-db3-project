// scheme-model
const db=require('../../data/db-config');

module.exports={find,findById,findSteps,add,addStep,update,remove}

async function find(){
const schemes= await db('schemes')
return schemes;
}

async function findById(id){
    const scheme= await db('schemes').where({id}).first()
    return scheme
}

//expects schema id
async function findSteps(id){
    console.log('id',id)
//    const steps= await db('steps as st')
//                 // .innerJoin('schemes as sc' , 'sc.id', 'st.scheme_id')
//                 // .where('scheme_id',id)
//                 // .select('sc.scheme_name','st.id','st.step_number', 'st.instructions')
//                 // .orderBy('st.step_number');

    const steps= await db('steps as st')
                        .innerJoin('schemes as sc','sc.id','st.scheme_id')
                        .where('st.scheme_id',id)
                        .select('st.id','sc.scheme_name','st.step_number','st.instructions')
                        .orderBy('st.step_number')
                    
    return steps;
}

async function add(scheme){
 const schemeId=  await db('schemes').insert(scheme)
 const newScheme= await findById(schemeId);
 return newScheme;
}

async function addStep(stepData, scheme_id){
  const newStep={...stepData,
             scheme_id:scheme_id}
  const stepId= await db('steps')
                 .insert(newStep)
  const SchemeSteps= await findSteps(scheme_id);
 return SchemeSteps;
}


async function update(changes,id){
    const updateCount= await db('schemes')
                    .where({id})
                    .update(changes)
    const updates= await findById(id);
    return updates;
}

async function remove(id){
    const count= await db('schemes').where({id}).del()
    return count;
}