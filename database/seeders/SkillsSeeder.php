<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class SkillsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('skills')->insert([
            [
                'text_es' => "Post Humano",
                'text_en' => "Post Human",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Al Iniciode tu Activación ouedes ganar el Estado /_concentrated/ Concentrado",
                'text_en' => "At the beginning of yor Activation you may gain the /_concentrated/ Focused state",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Análisi de Campo",
                'text_en' => "Field Analysis",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Una vez por Ronda, cuando se revele la carta de Iniciativa de una Unidad, Trishala puede activarse en ese momento.\n
                    En ese caso, la Unidad revelada se activará inmediatamente después de Trishala y Duquesa no podrá activarse esta Ronda. Además, 
                    ningún otro Personaje podrá activarse entre Trishala y la Unidad.",
                'text_en' => "Once per Round, when a Unit's Initiative card is revealed, Trishala may instantly be activated.\n 
                    In this case, the revealed Unit will be activated immediately after Trishala, and Duchess will not be activated during this Round. Also,
                    no other Character may be activated between Trishala and the Unit.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Compilador Avanzado",
                'text_en' => "Advanced Compiler",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "/_action/Compilador Avanzado: Sustiye un Software intalado en tu dispositivo de Hacker por otro en tu inventario que no esté instalado.",
                'text_en' => "/_action/Advanced Compiler: Replace an installled Software of your choosing with another one from your inventory that is not installed.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Debugger",
                'text_en' => "Debugger",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Una vez por Tirada de Hacker, puedes volver a lanzar cualquier dado en el que hayas abtenido una cara blanca.",
                'text_en' => "Once per Hacking Roll, you may re-roll any die that rolled a blank face.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Atraeré su Fuego",
                'text_en' => "I'll draw their Fire!",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Una vez durante tu Activación cuando inflinjas /_wound/ a un Enemigo, puedes tomar una ficha de /_agro/ de un Personaje y ponerla en tu carta de Personaje.",
                'text_en' => "Once per Activation, when you inflict any /_wound/ to an Enemy, you may take a /_agro/ taken from a Character and place it on your Character card.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Actitud Defensiva",
                'text_en' => "Defensiveness",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Una ve por Tirada de /_defense/, puedes volver a lanzar cualquier dado en el que hayas obtenido una cara blanca.",
                'text_en' => "Once per /_defense/ Roll, you may re-roll any die that rolled a blank face.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Daño por Saturación",
                'text_en' => "Saturation Attack",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Si estás equipada con dos Armas Ligeras puedes añadir un /_diceYellow/ a tus Tiradas de Ataque.",
                'text_en' => "If equipped with two Light Weapons, you may add one /_diceYellow/ to your Atack Rolls.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Fiable",
                'text_en' => "Trusty",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Si estás equipada con dos Armas Ligeras puedes añadir a tus Tiradas de Ataque un /_successWhite/ por cada cara blanca obtenida en cualquiera de tus dados.",
                'text_en' => "If equipped with two Light Weapons, you may add one /_successWhite/ to your Attack Rolls for each blank face rolled on your dice.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Médico Akbar",
                'text_en' => "Akbar Doctor",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Cuando utilices un MediKit o un Medjector, tu objetivo no recibe ninguna Secuela.",
                'text_en' => "When you use a MediKit or Medjector, your target does not recive any Consequence.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Tratamiento Avanzado",
                'text_en' => "Advanced Treatment",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "/_action/Tratamiento Avanzado: Un Personaje adyacente (que no sea un Remoto) puede voltear una Secuela para cancelar sus Efectos (recibiendo entonces -1/_health/).",
                'text_en' => "/_action/Advanced Treatment: An adjacent Character (other than a Remote) may flip a Consequence to cancel its Effects (then receiving -1/_health/).",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Carga Berserker",
                'text_en' => "Berserker Charge",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Durante tu Ativación, tus Tiradas de Ataque añade /_successWhite//_successWhite/ si has gastado puntos de movimiento durante la misma Activación.",
                'text_en' => "During your Actiation, add /_successWhite//_successWhite/ to your Attack Rolls if you have spent movement points during the same Activation.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Frenesí",
                'text_en' => "Frenzy",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Inmediatamente después de que inflinjas cualquier cantidad de /_wound/ al resolver una Tirada de Combate, puedes Desplazarte.",
                'text_en' => "Immediately after your inflict any number of /_wound/ during a Combat Roll, you may Displace.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Atek",
                'text_en' => "Atek",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "No puedes ejecutar la Acción Hackear ni ser el objetivo de Tiradas de Hackear, Software, sus Efectos ni sus Cambios.",
                'text_en' => "You cannot perform the Hacking Action, nor be the target of Hacking Rolls, Software, their Effects or their Switches.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Alférez",
                'text_en' => "Ensign",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Puedes equiparte con equipo Alto Mando.",
                'text_en' => "You have the High Command characteristic.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Visión Estratégica",
                'text_en' => "Strategic Vision",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Al inicio de tu Activación, puedes ver las dos primeras carts del mazo de Iniciativa y devolver al mazo cada una arriba o abajo, en el orden que quieras.",
                'text_en' => "At the beginning of your Activation, you may look at the first two cards from the Initiative deck and then return them on the top or the bottom of it, in the order you decide.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Biosintético",
                'text_en' => "Biosynthetic",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Raoul Spector posee la caracteristica Cuerpo LHost.",
                'text_en' => "You have the LHost Body characteristic.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Post Humano",
                'text_en' => "Post-Human",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Al Inicio de tu Activación puedes ganar el estado /_concentrated/ Concentrado.",
                'text_en' => "At the beginning of your Activation you may impose the /_concentrated/ Focused state on yourself.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Juggernaut",
                'text_en' => "Juggernaut",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Cuando ejecutes la acción Atacar ganas 1 Punto de Movimiento.",
                'text_en' => "When performing the Attack action, you gain 1 Movement Point.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Canana de Granadas",
                'text_en' => "Grenade Bandolier",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Tus Granadas no aplican los efectos de Desechable (no las descartes tras usarlas).",
                'text_en' => "Your Grenades do not apply the Effects of Expendable (do not discard then after using then).",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Visor Multispectral",
                'text_en' => "Multispectral Visor",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Las casillas con un marcador de Humo no obstaculizan tu Linea de Visión.",
                'text_en' => "Free spaces with a Smoke marker do not obstruct your Line of Sight.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Soy Humo",
                'text_en' => "I am Smoke",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Tus Granadas de Humo no aplican los efectos de Desechable (no las descartes tras usarlas).",
                'text_en' => "Your Smoke Grenades do not apply the Effects of Expendable (do not discard then after using then).",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Covert Action",
                'text_en' => "Covert Action",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Puedes equiparte con equipo Unidad Especial.",
                'text_en' => "You have the Special Unit characteristic.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Marrullera",
                'text_en' => "Sly",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Puedes volver a lanzar una vez cualquier cantidad de dados de tus Tiradas de Combate en los que hayas obtenido cara blanca.",
                'text_en' => "You may reroll once any number of dice from your Combat Rolls in which you obtained a blank side.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Contrabandista Irmandinha",
                'text_en' => "Irmandinha Smuggler",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "La primera vez que Interactúes con un Contenedor, no voltees si ficha (el siguiente Personaje puede Interactuar con el Contenedor).",
                'text_en' => "When you Interact with a Container for the first time, do not flip its token (the Container may be Interacted with one more time).",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Desde las Sombras",
                'text_en' => "From the Shadows",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Puedes añadir /_successWhite/ a tus Tiradas de Ataque si tienes el estado /_hidden/ Oculto.",
                'text_en' => "If you have the /_hidden/ Hidden state, you may add /_successWhite/ to your Attack Rolls.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Camoflaje TO",
                'text_en' => "To Camouflage",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Al final de tu Activación, puedes imponerte el estado /_hidden/ Oculto si ningún Enemigo tiene Linea de Visión hacia ti.",
                'text_en' => "At the end of your Activation, you may impose the /_hidden/ Hidden state on yourself if no Enemy has Line of Sight to you.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Oniwaban",
                'text_en' => "Oniwaban",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Puedes equiparte con equipo Unidad Especial.",
                'text_en' => "You have the Special Unit characteristic.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Kinemática",
                'text_en' => "Kinematic",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Después de que resuelvas una Tirada de /_defense/ Defensa, puedes Desplazarte.",
                'text_en' => "You may Displace after resolving a /_defense/ Defense Roll.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "¡Al Asalto!",
                'text_en' => "Charge!",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Las Escopetas sólo ocupan 1 Ranura de Equipo /_hand/ en tu carta de Personaje.",
                'text_en' => "Shotguns only take 1 /_hand/ Equipment Slot in your Character card.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Kiiutan Imposter",
                'text_en' => "Kiiutan Imposter",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Cunado un Enemigo te ataque desde Alcance 3 o superior, puedes repetir el lanzamiento de un único dado de la Tirada del Enemigo.",
                'text_en' => "You may reroll a single die from the Enemy Roll when they Attack you frim Range 3 or higher.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Corahtaa",
                'text_en' => "Corahtaa",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Si hay almenos 1 Personaje (que no sea Remoto) en la misma loseta que tú, puedes repetir, una vez por Tirada, el lanzamiento de los dados en los que obtengas cara blanca.",
                'text_en' => "Once per Roll, you may reroll the dice from which you got a blank face if ther is at least 1 Character (other than Remotes) in the same tile as you.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "La Fe Nos Impele",
                'text_en' => "Faith Drives Us",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Al iniciode tu Activación, todos los Personajes (que no sean Remotos) pueden Desplazarse.",
                'text_en' => "All Characters (except Remotes) may Displace at the beginning of your Activation.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Observancia",
                'text_en' => "Observance",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "La primera vez que declares un Ataque durante cada Ronda, puedes añadir /_successWhite/ a tu Tirada.",
                'text_en' => "Each Round you may add /_successWhite/ to your Roll the first time you declare an Attack.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Post Humano",
                'text_en' => "Post-Human",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Al Inicio de tu Activación puedes ganar el estado /_concentrated/ Concentrado.",
                'text_en' => "At the beginning of your Activation you may impose the /_concentrated/ Focused state on yourself.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Post Humano",
                'text_en' => "Post-Human",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Al Inicio de tu Activación puedes ganar el estado /_concentrated/ Concentrado.",
                'text_en' => "At the beginning of your Activation you may impose the /_concentrated/ Focused state on yourself.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Experto Táctico",
                'text_en' => "Tactical Expert",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Al inicio de la misión, vóltea el mazo de Iniciativa. Las cartas de Iniciativa deben estar boca arriba en todo momento.",
                'text_en' => "Flip the Initiative deck at the begining of the mission. Initiative cards must be face up at all times.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Contactos",
                'text_en' => "Contacts",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Cuando Interactúes con un Personaje Neutral por primera vez, roba una carta dl mazo de Botín.",
                'text_en' => "Flip the Initiative deck at the begining of the mission. Initiative cards must be face up at all times.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Te Tengo...",
                'text_en' => "Gotcha...",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Una vez por Activación puedes imponerle el estado /_marked/ Marcado a un Enemigo con el que tengas Linea de Visión.",
                'text_en' => "You may impose the /_marked/ Targeted state on an Enemy in Line of Sight once per Activation.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Hacker Defensiva",
                'text_en' => "Defensive Hacker",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "Puedes añadir /_guardWhite/ a tus Tiradas de Hacker.",
                'text_en' => "You may add /_guardWhite/ to your Hacking Rolls.",
                'Type' => "personalSkill/Content"
            ],
            [
                'text_es' => "Wardriver",
                'text_en' => "Wardriver",
                'Type' => "personalSkill/title"
            ],
            [
                'text_es' => "AL adquirir un Dispositivo de Hacker o Software lanza /_diceYellow/. Por cada /_specialWhite/ que obtengas, resta 1 a su valor en /_package/ o /_fragment/ (coste mínimo 0).",
                'text_en' => "Roll /_diceYellow/ when you acquire a Hacking Device or Software. Subtract 1 from their /_package/ or /_fragment/ value for each /_specialWhite/ you obtain(minimun cost = 0).",
                'Type' => "personalSkill/Content"
            ],
        ]);
    }
}
