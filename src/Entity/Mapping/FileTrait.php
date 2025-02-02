<?php


namespace App\Entity\Mapping;

use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation as Serializer;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * PrintJob
 *
 * @ORM\Table("file")
 */
trait FileTrait
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(name="id", type="integer", options={"unsigned"=true})
     * @Serializer\Groups ({"admin", "detail", "list"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Project", inversedBy="files")
     * @ORM\JoinColumn(name="project_id", referencedColumnName="id")
     * @Serializer\Groups ({"admin", "detail", "list"})
     */
    private $project;

    /**
     * @ORM\Column(type="string", length=60, nullable=true)
     * @Serializer\Groups ({"admin", "detail", "list"})
     */
    private $title;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Serializer\Groups ({"admin", "detail", "list"})
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255, options={"comment":"uploaded_file"})
     * @Serializer\Groups ({"admin", "detail", "list"})
     */
    private $data;
}